import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useAppDispatch } from '../../store/hooks';
import {
  setHasPin,
  setPasscodeMode,
  setPasscodeVerified,
} from '../../store/slices/authSlice';
import * as secureAuth from '../../services/storage/secureAuth';
import { PASSCODE_LENGTH, SUBMIT_DELAY } from '../../constants/app';
import { Props } from './types';

type UsePasscodeParams = Pick<Props, 'navigation' | 'route'>;

export const usePasscode = ({ navigation, route }: UsePasscodeParams) => {
  const { mode, initialPasscode } = route.params;
  const dispatch = useAppDispatch();

  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCreateMode = mode === 'create';
  const isResetMode = mode === 'reset';
  const isEnterMode = mode === 'enter';
  const isConfirmCreateMode = mode === 'confirmCreate';
  const isConfirmResetMode = mode === 'confirmReset';
  const isConfirmMode = isConfirmCreateMode || isConfirmResetMode;

  const title = isCreateMode
    ? 'Set a 6-digit Passcode'
    : isConfirmCreateMode
    ? 'Confirm Passcode'
    : isResetMode
    ? 'Set New PIN'
    : isEnterMode
    ? 'Enter Passcode'
    : 'Confirm New PIN';

  const subtitle = isCreateMode
    ? 'This passcode will be used for login'
    : isConfirmCreateMode
    ? 'Re-enter the same passcode as before'
    : isResetMode
    ? 'Please set a new 6-digit PIN'
    : isEnterMode
    ? 'Please enter your passcode to continue'
    : 'Please re-enter your new PIN to confirm';

  const clearPasscode = () => {
    setPasscode('');
    setIsSubmitting(false);
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
    clearPasscode();
    Alert.alert('Error', 'Passcodes do not match');
  };

  const handleIncorrectPasscode = () => {
    clearPasscode();
    Alert.alert('Error', 'Incorrect passcode');
  };

  const handlePasscodeSuccess = () => {
    clearPasscode();
  };

  const showMissingPhoneAlert = () => {
    clearPasscode();
    Alert.alert('Error', 'No phone found for this session. Please sign in again.');
  };

  const handlePressNumber = (num: string) => {
    if (isSubmitting || passcode.length >= PASSCODE_LENGTH) {
      return;
    }

    setPasscode(prev => prev + num);
  };

  const handleDelete = () => {
    if (isSubmitting || passcode.length === 0) {
      return;
    }

    setPasscode(prev => prev.slice(0, -1));
  };

  const saveNewPasscode = async () => {
    try {
      if (passcode !== initialPasscode) {
        handlePasscodeMismatch();
        return;
      }

      const phone = await secureAuth.getPhone();

      if (!phone) {
        showMissingPhoneAlert();
        return;
      }

      await secureAuth.savePasscode(phone, passcode);
      dispatch(setHasPin(true));
      dispatch(setPasscodeVerified(true));
      dispatch(setPasscodeMode(null));
      handlePasscodeSuccess();
    } catch {
      clearPasscode();
      Alert.alert('Error', 'Failed to save passcode');
    }
  };

  const verifyExistingPasscode = async () => {
    try {
      const phone = await secureAuth.getPhone();

      if (!phone) {
        showMissingPhoneAlert();
        return;
      }

      const storedPasscode = await secureAuth.getPasscode(phone);

      if (!storedPasscode) {
        dispatch(setHasPin(false));
        dispatch(setPasscodeVerified(false));
        dispatch(setPasscodeMode('create'));
        clearPasscode();

        Alert.alert(
          'No Passcode',
          'No passcode is set for this account. Please create a new passcode.',
        );
        return;
      }

      if (passcode !== storedPasscode) {
        handleIncorrectPasscode();
        return;
      }

      dispatch(setPasscodeVerified(true));
      dispatch(setPasscodeMode(null));
      handlePasscodeSuccess();
    } catch {
      clearPasscode();
      Alert.alert('Error', 'Failed to read passcode');
    }
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
        void saveNewPasscode();
        return;
      }

      if (isEnterMode) {
        void verifyExistingPasscode();
      }
    }, SUBMIT_DELAY);

    return () => clearTimeout(timer);
  }, [
    passcode,
    isCreateMode,
    isResetMode,
    isConfirmMode,
    isEnterMode,
    initialPasscode,
    navigation,
  ]);

  return {
    passcode,
    isSubmitting,
    title,
    subtitle,
    handlePressNumber,
    handleDelete,
  };
};