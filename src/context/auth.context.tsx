import {createContext, useContext, useEffect, useState} from 'react';
import {z} from 'zod';
import {UserSchema, loginUserSchem} from '../services/user/user.schemas';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authContextSchema = z.object({
  user: UserSchema.optional(),
  getUser: z.function().returns(UserSchema),
  signIn: z.function().args(loginUserSchem),
  signOut: z.function(),
  isLoggedIn: z.boolean(),
});

const AuthContext = createContext<z.infer<typeof authContextSchema>>({
  signIn: () => {},
  signOut: () => {},
  isLoggedIn: false,
  getUser: () => ({} as any),
});

const useAuthContext = () => useContext(AuthContext);

function AuthContextProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<z.infer<typeof UserSchema>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem('user');

      if (user) {
        setUser(JSON.parse(user));
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn: async ({accessToken, ...user}) => {
          setUser(user);
          await AsyncStorage.setItem('user', JSON.stringify(user));
          await AsyncStorage.setItem('accessToken', accessToken);
        },
        signOut: async () => {
          setUser(undefined);
          await AsyncStorage.removeItem('user');
        },
        getUser: () => {
          if (!user) {
            throw new Error('User not found');
          }
          return user;
        },
        isLoggedIn: user !== undefined,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export {AuthContext, useAuthContext, AuthContextProvider};
