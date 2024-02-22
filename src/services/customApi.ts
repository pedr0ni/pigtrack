import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiFetcherArgs, tsRestFetchApi} from '@ts-rest/core';

const customApi = async (args: ApiFetcherArgs) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    args.headers = {
      ...args.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return tsRestFetchApi(args);
};

export default customApi;
