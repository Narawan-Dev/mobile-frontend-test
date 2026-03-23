import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { Props } from './types';

type UseSettingParams = Pick<Props, 'navigation'>;

export const useSetting = ({ navigation }: UseSettingParams) => {
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
          onPress: () =>
            navigation.navigate('Passcode', {
              mode: 'reset',
            }),
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
          onPress: () => {
            const parentNavigation = navigation.getParent();

            if (parentNavigation) {
              parentNavigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'SignIn' }],
                }),
              );
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