import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export default function useToken() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');

      if (token) {
        setToken(token);
      }
    };

    loadToken();
  }, []);

  return token;
}
