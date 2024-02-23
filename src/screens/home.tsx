import {Bell, PiggyBank} from 'lucide-react-native';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeliveryItem from '../components/delivery-item';
import {userClient} from '../services/user/users.client';
import {useAuthContext} from '../context/auth.context';
import {useQueryClient} from '@tanstack/react-query';
import AddPacket from '../components/add-packet';
import PacketSkeleton from '../components/packet-skeleton';

export default function HomeScreen() {
  const auth = useAuthContext();
  const queryClient = useQueryClient();
  const {data, isError, isLoading, isRefetching} =
    userClient.getPackets.useQuery(['packets'], {
      params: {id: auth.getUser()._id},
    });

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
              <Bell onPress={auth.signOut} color="white" size={28} />
            </TouchableOpacity>
          </View>

          <View className="flex mt-10">
            <View>
              <Text className="text-2xl font-bold text-white font-inter">
                Procure sua encomenda
              </Text>
              <Text className="text-gray-300 font-inter mt-2">
                Adicione o código de rastreamento para procurar por uma
                encomenda
              </Text>
            </View>

            <AddPacket />
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView className="flex-1 dark:bg-slate-900">
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() =>
                queryClient.invalidateQueries({queryKey: ['packets']})
              }
            />
          }
          className="px-4"
        >
          <Text className="text-2xl mt-4 text-gray-900 font-bold font-inter dark:text-white">
            Minhas encomendas
          </Text>

          <View className="flex-1">
            {isLoading && (
              <>
                {[1, 2, 3, 4, 5].map(item => (
                  <PacketSkeleton key={item} />
                ))}
              </>
            )}
            {data &&
              data.body.map(item => (
                <DeliveryItem packet={item} key={item._id} />
              ))}
            {data && data.body.length === 0 && (
              <View className="flex-1 justify-center items-center">
                <Image
                  className="w-[300px] h-[300px]"
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
                  className="w-[300px] h-[300px]"
                  source={require('../../assets/error.png')}
                />
                <Text className="text-xl text-center mt-4 text-gray-900 font-medium font-inter dark:text-white">
                  Ocorreu um erro ao atualizar suas encomendas.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
