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
import {CreateUserSchema} from '../services/user/user.schemas';
import {userClient} from '../services/user/users.client';
import {useToast} from '../components/toast';

export default function RegisterScreen() {
  const {toggleColorScheme} = useColorScheme();
  const [toggleEye, setToggleEye] = useState(false);
  const {navigate} = useNavigation<RootNavigationProps>();
  const {toast} = useToast();

  const {mutate, isPending} = userClient.createUser.useMutation({
    onSuccess: () => {
      toast('Sua conta foi criada com sucesso', 'success');
      navigate('Login');
    },
    onError: () => toast('Ocorreu um erro ao criar sua conta', 'destructive'),
  });

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
  });

  function onSubmit(values: z.infer<typeof CreateUserSchema>) {
    mutate({body: values});
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

        <Button
          isLoading={isPending}
          className="my-6"
          onPress={form.handleSubmit(onSubmit)}
        >
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
