import MaterialIcons from '@react-native-vector-icons/material-icons';

export type RootStackParamList = {
  SignIn: undefined;
  Otp: { phone: string };
  Passcode: {
    mode: 'create' | 'confirmCreate' | 'reset' | 'confirmReset' | 'enter';
    initialPasscode?: string;
  };
  MainTab: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Withdraw: undefined;
  Setting: undefined;
};

export type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];