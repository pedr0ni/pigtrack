import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Button from '../components/button';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../router/routes.types';
import {Eye, EyeOff} from 'lucide-react-native';
import {useState} from 'react';
import {useColorScheme} from 'nativewind';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginScreen() {
  const {toggleColorScheme} = useColorScheme();
  const [toggleEye, setToggleEye] = useState(false);
  const {navigate} = useNavigation<RootNavigationProps>();
  const {setValue, handleSubmit} = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    navigate('Home');
  }

  const EyeIcon = toggleEye ? Eye : EyeOff;

  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
      <View className="flex items-center">
        <Text
          onPress={toggleColorScheme}
          className="font-inter text-2xl text-red-300 font-bold text-gray-800 dark:text-white"
        >
          Entrar
        </Text>
      </View>

      <View className="flex gap-4 px-4 mt-10">
        <View>
          <Text className="font-inter">E-mail</Text>
          <TextInput
            placeholder="Digite seu e-mail"
            className="border border-gray-300 h-12 rounded-[8px] px-2"
            onChange={e => setValue('email', e.nativeEvent.text)}
          />
        </View>

        <View>
          <Text className="font-inter">Senha</Text>
          <View className="relative flex justify-center">
            <TextInput
              placeholder="Digite sua senha"
              className="border border-gray-300 h-12 rounded-[8px] px-2"
              onChange={e => setValue('password', e.nativeEvent.text)}
              secureTextEntry={!toggleEye}
            />
            <TouchableOpacity
              onPress={() => setToggleEye(!toggleEye)}
              className="absolute right-4"
            >
              <EyeIcon color="gray" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-end mt-2">
            <TouchableOpacity>
              <Text className="font-inter color-gray-800">
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button onPress={handleSubmit(onSubmit)}>Entrar</Button>

        <View className="flex flex-row justify-center items-center gap-x-1">
          <Text className="font-inter color-gray-600">
            Não possui uma conta?
          </Text>
          <TouchableOpacity>
            <Text className="font-inter color-slate-800 font-medium">
              Criar uma conta
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center my-6">
          <View className="bg-gray-400 h-[1px] flex-1" />
          <Text className="font-inter px-2">Ou entre com</Text>
          <View className="bg-gray-400 h-[1px] flex-1" />
        </View>

        <View className="flex gap-y-4">
          <TouchableOpacity className="border border-gray-300 rounded-[8px] h-12 flex flex-row items-center justify-center w-full">
            <Image
              className="w-6 h-6 mr-4"
              source={require('../../assets/google.png')}
            />
            <Text className="font-inter font-medium color-gray-800">
              Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Home')}
            className="border border-gray-300 rounded-[8px] h-12 flex flex-row items-center justify-center w-full"
          >
            <Image
              className="w-6 h-6 mr-4"
              source={require('../../assets/apple.png')}
            />
            <Text className="font-inter font-medium color-gray-800">Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
