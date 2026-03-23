import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { useAppDispatch } from '../../store/hooks';
import { setHasPin, setPasscodeVerified } from '../../store/slices/authSlice';
import * as secureAuth from '../../services/storage/secureAuth';
import { PASSCODE_LENGTH, SUBMIT_DELAY } from '../../constants/app';
import { Props } from './types';

type UsePasscodeParams = Pick<Props, 'navigation' | 'route'>;

export const usePasscode = ({ navigation, route }: UsePasscodeParams) => {
  const { mode, initialPasscode } = route.params;
  const dispatch = useAppDispatch();

  const [passcode, setPasscodeState] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCreateMode = mode === 'create';
  const isResetMode = mode === 'reset';
  const isConfirmCreateMode = mode === 'confirmCreate';
  const isConfirmResetMode = mode === 'confirmReset';
  const isConfirmMode = isConfirmCreateMode || isConfirmResetMode;

  const getTitle = () => {
    if (isCreateMode) return 'Set a 6-digit Passcode';
    if (isConfirmCreateMode) return 'Confirm Passcode';
    if (isResetMode) return 'Set New PIN';
    if (mode === 'enter') return 'Enter Passcode';
    return 'Confirm New PIN';
  };

  const getSubtitle = () => {
    if (isCreateMode) {
      return 'This passcode will be used for login';
    }

    if (isConfirmCreateMode) {
      return 'Re-enter the same passcode as before';
    }

    if (isResetMode) {
      return 'Please set a new 6-digit PIN';
    }

    if (mode === 'enter') {
      return 'Please enter your passcode to continue';
    }

    return 'Please re-enter your new PIN to confirm';
  };

  const resetToMainTab = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTab' }],
      }),
    );
  };

  const goToConfirmScreen = () => {
    if (isCreateMode) {
      navigation.replace('Passcode', {
        mode: 'confirmCreate',
        initialPasscode: passcode,
      });
      return;
    }

    if (isResetMode) {
      navigation.replace('Passcode', {
        mode: 'confirmReset',
        initialPasscode: passcode,
      });
    }
  };

  const handlePasscodeMismatch = () => {
    setIsSubmitting(false);
    setPasscodeState('');
    Alert.alert('Error', 'Passcodes do not match');
  };

  const handleIncorrectPasscode = () => {
    setIsSubmitting(false);
    setPasscodeState('');
    Alert.alert('Error', 'Incorrect passcode');
  };

  const handlePasscodeSuccess = () => {
    setIsSubmitting(false);
    setPasscodeState('');
    resetToMainTab();
  };

  const handlePressNumber = (num: string) => {
    if (passcode.length >= PASSCODE_LENGTH || isSubmitting) {
      return;
    }

    setPasscodeState(prev => prev + num);
  };

  const handleDelete = () => {
    if (isSubmitting) {
      return;
    }

    setPasscodeState(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    if (passcode.length !== PASSCODE_LENGTH) {
      return;
    }

    setIsSubmitting(true);

    const timer = setTimeout(() => {
      if (isCreateMode || isResetMode) {
        setIsSubmitting(false);
        goToConfirmScreen();
        return;
      }

      if (isConfirmMode) {
        if (passcode !== initialPasscode) {
          handlePasscodeMismatch();
          return;
        }

        (async () => {
          try {
            const phone = await secureAuth.getPhone();

            if (!phone) {
              setIsSubmitting(false);
              Alert.alert('Error', 'No phone found for this session. Please sign in again.');
              return;
            }

            await secureAuth.savePasscode(phone, passcode);
            dispatch(setHasPin(true));
            dispatch(setPasscodeVerified(true));
            handlePasscodeSuccess();
          } catch {
            setIsSubmitting(false);
            Alert.alert('Error', 'Failed to save passcode');
          }
        })();

        return;
      }

      if (mode === 'enter') {
        (async () => {
          try {
            const phone = await secureAuth.getPhone();

            if (!phone) {
              setIsSubmitting(false);
              Alert.alert('Error', 'No phone found for this session. Please sign in again.');
              return;
            }

            const stored = await secureAuth.getPasscode(phone);

            if (!stored) {
              dispatch(setHasPin(false));
              dispatch(setPasscodeVerified(false));
              setIsSubmitting(false);
              setPasscodeState('');

              Alert.alert(
                'No Passcode',
                'No passcode is set for this account. Please create a new passcode.',
                [
                  {
                    text: 'OK',
                    onPress: () =>
                      navigation.replace('Passcode', {
                        mode: 'create',
                      }),
                  },
                ],
              );
              return;
            }

            if (passcode !== stored) {
              handleIncorrectPasscode();
              return;
            }

            dispatch(setPasscodeVerified(true));
            handlePasscodeSuccess();
          } catch {
            setIsSubmitting(false);
            Alert.alert('Error', 'Failed to read passcode');
          }
        })();

        return;
      }
    }, SUBMIT_DELAY);

    return () => clearTimeout(timer);
  }, [
    passcode,
    mode,
    initialPasscode,
    isCreateMode,
    isResetMode,
    isConfirmMode,
    dispatch,
    navigation,
  ]);

  return {
    passcode,
    isSubmitting,
    getTitle,
    getSubtitle,
    handlePressNumber,
    handleDelete,
  };
};