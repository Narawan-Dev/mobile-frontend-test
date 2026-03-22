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