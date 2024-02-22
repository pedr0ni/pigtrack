import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Packet: {id: string} | undefined;
};

export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
