import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

export type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export type OtpFormValues = {
  otp: string;
};