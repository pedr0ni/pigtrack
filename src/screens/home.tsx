import {Bell, PiggyBank, Search} from 'lucide-react-native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Input from '../components/input';
import DeliveryItem from '../components/delivery-item';
import {useToast} from '../components/toast';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../router/routes.types';
import {userClient} from '../services/user/users.client';
import Skeleton from '../components/skeleton';

export default function HomeScreen() {
  const {data, isError, isLoading, error} = userClient.getPackets.useQuery(
    ['packets'],
    {
      params: {id: '65d3a88d3e8eafa03b2e5663'},
    }
  );
  const {navigate} = useNavigation<RootNavigationProps>();
  const {toast} = useToast();

  const onAddPacket = () => {
    toast('Encomenda adicionada com sucesso!', 'success');
  };

  console.log(data, isLoading, error);

  return (
    <View className="flex-1">
      <SafeAreaView className="bg-slate-800">
        <View className="flex px-4 pb-4">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row justify-center items-center gap-2">
              <PiggyBank color="white" size={48} />
              <Text className="text-lg text-white font-bold font-inter">
                PigTrack
              </Text>
            </View>

            <TouchableOpacity>
              <Bell onPress={() => navigate('Login')} color="white" size={28} />
            </TouchableOpacity>
          </View>

          <View className="flex gap-4 mt-4">
            <View className="mt-6">
              <Text className="text-2xl font-bold text-white font-inter">
                Procure sua encomenda
              </Text>
              <Text className="text-gray-300 font-inter">
                Adicione o código de rastreamento para procurar por uma
                encomenda
              </Text>
            </View>

            <View className="relative flex flex-col items-center justify-center">
              <Input
                className="bg-white rounded-[8px] h-12 w-full"
                placeholder="AB1234566CD"
              />
              <TouchableOpacity
                onPress={onAddPacket}
                className="absolute right-3"
              >
                <Search size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView className="flex-1 dark:bg-slate-900">
        <View>
          <ScrollView className="px-4">
            <Text className="text-2xl mt-4 text-gray-900 font-bold font-inter dark:text-white">
              Minhas encomendas
            </Text>

            <View className="flex-1">
              {isLoading && (
                <View className="flex flex-row items-center">
                  <Skeleton classes="h-[64px] w-[64px] rounded-full" />
                  <View className="flex ml-2">
                    <Skeleton classes="h-[10px] w-[120px] rounded-[8px]" />
                    <Skeleton classes="h-[10px] w-[220px] rounded-[8px] mt-2" />
                  </View>
                </View>
              )}
              {data &&
                data.body.map(item => (
                  <DeliveryItem packet={item} key={item._id} />
                ))}
              {data && data.body.length === 0 && (
                <View className="flex-1 justify-center items-center">
                  <Image
                    className="w-[300px] h-[300px] mr-4"
                    source={require('../../assets/empty.png')}
                  />
                  <Text className="text-xl mt-4 text-gray-900 font-medium font-inter dark:text-white">
                    Você não possui nenhuma encomenda.
                  </Text>
                </View>
              )}
              {isError && (
                <View className="flex-1 justify-center items-center">
                  <Image
                    className="w-[300px] h-[300px] mr-4"
                    source={require('../../assets/error.png')}
                  />
                  <Text className="text-xl mt-4 text-gray-900 font-medium font-inter dark:text-white">
                    Ocorreu um erro ao atualizar suas encomendas.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
