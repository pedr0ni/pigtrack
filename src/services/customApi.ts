import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiFetcherArgs, tsRestFetchApi} from '@ts-rest/core';
import {navigateOff} from '../router/routes';
import {jwtDecode} from 'jwt-decode';

function isTokenExpired(token: string) {
  try {
    const {exp} = jwtDecode(token);

    return Date.now() >= (exp ?? 0) * 1000;
  } catch (err) {
    console.error(err);
  }
}

const customApi = async (args: ApiFetcherArgs) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    if (isTokenExpired(token)) {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('user');
      navigateOff('Login');
      throw new Error('Token expired');
    }

    args.headers = {
      ...args.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return tsRestFetchApi(args);
};

export default customApi;
