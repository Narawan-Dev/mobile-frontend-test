import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../../navigation/types';

export type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Setting'>,
  NativeStackScreenProps<RootStackParamList>
>;