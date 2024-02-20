import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import {RootStackParamList} from './routes.types';
import RegisterScreen from '../screens/register';
import {useAuthContext} from '../context/auth.context';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const auth = useAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {auth.isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
