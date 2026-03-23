import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

export type SignInFormValues = {
  phone: string;
};

export type SignInNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;