import { Alert } from 'react-native';
import { useAppDispatch } from '../../store/hooks';
import {
  logout,
  setPasscodeMode,
  setPasscodeVerified,
} from '../../store/slices/authSlice';
import * as secureAuth from '../../services/storage/secureAuth';

export const useSetting = () => {
  const dispatch = useAppDispatch();

  const handleResetPin = () => {
    Alert.alert(
      'Reset PIN',
      'You will need to set a new PIN. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: () => {
            dispatch(setPasscodeVerified(false));
            dispatch(setPasscodeMode('reset'));
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await secureAuth.clearToken();
              await secureAuth.clearPhone();
            } finally {
              dispatch(logout());
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return {
    handleResetPin,
    handleLogout,
  };
};