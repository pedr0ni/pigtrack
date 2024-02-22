import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import HomeScreen from '../screens/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import {RootStackParamList} from './routes.types';
import RegisterScreen from '../screens/register';
import {useAuthContext} from '../context/auth.context';
import {createRef} from 'react';
import PacketScreen from '../screens/packet';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();

export const navigateOff = (route: keyof RootStackParamList) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(route);
  }
};

export default function Routes() {
  const auth = useAuthContext();

  return (
    <NavigationContainer>
      <NavigationContainer independent ref={navigationRef}>
        <Stack.Navigator>
          {auth.isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Packet"
                component={PacketScreen}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationContainer>
  );
}
