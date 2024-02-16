import {Text, TouchableOpacity, View} from 'react-native';
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
  name: z.string({required_error: 'Digite seu nome.'}),
  phone: z.string({required_error: 'Digite seu telefone.'}),
  email: z
    .string({required_error: 'Digite seu e-mail'})
    .email({message: 'Digite um e-mail válido.'}),
  password: z.string({required_error: 'Digite sua senha.'}),
});

export default function RegisterScreen() {
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
          Registre-se
        </Text>
      </View>

      <View className="flex px-4 mt-10">
        <FormInput
          label="Nome"
          placeholder="Digite seu nome completo"
          name="name"
          form={form}
        />
        <FormInput
          label="Telefone"
          placeholder="Digite seu telefone"
          name="phone"
          form={form}
          className="mt-4"
        />
        <FormInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          name="email"
          form={form}
          className="mt-4"
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
          Criar conta
        </Button>

        <View className="flex flex-row justify-center items-center gap-x-1">
          <Text className="font-inter color-gray-600">
            Já possui uma conta?
          </Text>
          <TouchableOpacity onPress={() => navigate('Login')}>
            <Text className="font-inter color-slate-800 font-medium dark:text-white">
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
