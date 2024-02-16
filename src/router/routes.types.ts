import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
