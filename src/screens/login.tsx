import {Image, Text, TouchableOpacity, View} from 'react-native';
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
import FormInput from '../components/form-input';

const formSchema = z.object({
  email: z
    .string({required_error: 'Digite seu e-mail'})
    .email({message: 'Digite um e-mail válido.'}),
  password: z.string({required_error: 'Digite sua senha.'}),
});

export default function LoginScreen() {
  const {toggleColorScheme} = useColorScheme();
  const [toggleEye, setToggleEye] = useState(false);
  const {navigate} = useNavigation<RootNavigationProps>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    <SafeAreaView className="flex-1 justify-center dark:bg-slate-900">
      <View className="flex items-center">
        <Text
          onPress={toggleColorScheme}
          className="font-inter text-2xl text-red-300 font-bold text-gray-800 dark:text-white"
        >
          Entrar
        </Text>
      </View>

      <View className="flex px-4 mt-10">
        <FormInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          name="email"
          form={form}
        />
        <FormInput
          label="Senha"
          name="password"
          placeholder="Digite sua senha"
          icon={<EyeIcon color="gray" />}
          secureTextEntry={!toggleEye}
          onIconPress={() => setToggleEye(!toggleEye)}
          form={form}
          className="mt-4"
        />

        <Button className="my-6" onPress={form.handleSubmit(onSubmit)}>
          Entrar
        </Button>

        <View className="flex flex-row justify-center items-center gap-x-1">
          <Text className="font-inter color-gray-600">
            Não possui uma conta?
          </Text>
          <TouchableOpacity onPress={() => navigate('Register')}>
            <Text className="font-inter color-slate-800 font-medium dark:text-white">
              Criar uma conta
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center my-6">
          <View className="bg-gray-400 h-[1px] flex-1" />
          <Text className="font-inter px-2 dark:text-white">Ou entre com</Text>
          <View className="bg-gray-400 h-[1px] flex-1" />
        </View>

        <View className="flex gap-y-4">
          <TouchableOpacity className="border border-gray-300 dark:border-white rounded-[8px] h-12 flex flex-row items-center justify-center w-full">
            <Image
              className="w-6 h-6 mr-4"
              source={require('../../assets/google.png')}
            />
            <Text className="font-inter font-medium color-gray-800 dark:text-white">
              Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Home')}
            className="border border-gray-300 dark:border-white rounded-[8px] h-12 flex flex-row items-center justify-center w-full"
          >
            <Image
              className="w-6 h-6 mr-4"
              source={require('../../assets/apple.png')}
            />
            <Text className="font-inter font-medium color-gray-800 dark:text-white">
              Apple
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
