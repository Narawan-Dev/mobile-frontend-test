import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setPasscode,
  setHasPin,
  setPasscodeVerified,
} from '../../store/slices/authSlice';
import { PASSCODE_LENGTH, SUBMIT_DELAY } from '../../constants/app';
import { Props } from './types';

type UsePasscodeParams = Pick<Props, 'navigation' | 'route'>;

export const usePasscode = ({ navigation, route }: UsePasscodeParams) => {
  const { mode, initialPasscode } = route.params;
  const dispatch = useAppDispatch();

  const storedPasscode = useAppSelector(s => s.auth.passcode);

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
    Alert.alert('Passcode mismatch', 'Please try again');
    setPasscodeState('');
  };

  const handlePasscodeSuccess = () => {
    setIsSubmitting(false);

    const successMessage =
      mode === 'enter'
        ? 'Passcode accepted'
        : isConfirmResetMode
          ? 'PIN has been reset successfully'
          : 'Passcode has been set successfully';

    Alert.alert('Success', successMessage, [
      {
        text: 'OK',
        onPress: resetToMainTab,
      },
    ]);
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

      if (isConfirmMode && passcode !== initialPasscode) {
        handlePasscodeMismatch();
        return;
      }

      if (isConfirmMode) {
        dispatch(setPasscode(passcode));
        dispatch(setHasPin(true));
        dispatch(setPasscodeVerified(true));
        handlePasscodeSuccess();
        return;
      }

      if (mode === 'enter') {
        if (!storedPasscode) {
          setIsSubmitting(false);
          Alert.alert('No passcode set', 'Please set a passcode first', [
            {
              text: 'OK',
              onPress: resetToMainTab,
            },
          ]);
          return;
        }

        if (passcode !== storedPasscode) {
          handlePasscodeMismatch();
          return;
        }

        dispatch(setPasscodeVerified(true));
        handlePasscodeSuccess();
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
    storedPasscode,
    dispatch,
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