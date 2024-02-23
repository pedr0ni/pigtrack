import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootNavigationProps, RootStackParamList} from '../router/routes.types';
import {packetClient} from '../services/packet/packet.client';
import moment from 'moment';
import {TrashIcon, Truck} from 'lucide-react-native';
import PacketSkeleton from '../components/packet-skeleton';
import Dialog from 'react-native-dialog';
import Skeleton from '../components/skeleton';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useToast} from '../components/toast';

export default function PacketScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Packet'>) {
  const id = route.params?.id ?? '';
  const {navigate} = useNavigation<RootNavigationProps>();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {toast} = useToast();

  const {data, isLoading} = packetClient.getPacket.useQuery(['packet', id], {
    params: {id},
  });

  const {mutate: deletePacket, isPending} =
    packetClient.deletePacket.useMutation({
      onSuccess: () => {
        toast('Encomenda deletada com sucesso.', 'success');
        navigate('Home');
      },
      onError: () =>
        toast('Ocorreu um erro ao deletar a encomenda.', 'destructive'),
    });

  const onDeletePacket = () => {
    deletePacket({params: {id}});
  };

  return (
    <>
      <Dialog.Container visible={deleteOpen}>
        <Dialog.Title>Deletar encomenda</Dialog.Title>
        <Dialog.Description>
          Você tem certeza que deseja deletar essa encomenda?
        </Dialog.Description>

        {!isPending && (
          <Dialog.Button
            onPress={() => setDeleteOpen(false)}
            label="Cancelar"
          />
        )}
        {!isPending && (
          <Dialog.Button color="red" onPress={onDeletePacket} label="Deletar" />
        )}

        {isPending && <ActivityIndicator className="mb-5" />}
      </Dialog.Container>

      <SafeAreaView className="flex-1 dark:bg-slate-900">
        <View className="flex-1">
          <View className="flex bg-slate-800 p-4 flex-row justify-between items-center">
            {isLoading ? (
              <View>
                <Skeleton classes="h-[10px] w-[120px] rounded-[8px]" />
                <Skeleton classes="h-[10px] w-[220px] rounded-[8px] mt-2" />
              </View>
            ) : (
              <View>
                <Text className="font-inter text-white text-2xl font-bold">
                  {data?.body.code}
                </Text>
                <Text className="font-inter text-white text-xl text-gray-200">
                  {data?.body.name}
                </Text>
              </View>
            )}

            {!isLoading && (
              <TouchableOpacity
                onPress={() => setDeleteOpen(true)}
                className="bg-red-300 w-10 h-10 rounded-full flex items-center justify-center"
              >
                <TrashIcon size={20} color="red" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView className="flex-1 p-4">
            {isLoading && (
              <>
                {[1, 2, 3, 4, 5].map(item => (
                  <PacketSkeleton key={item} />
                ))}
              </>
            )}
            {data &&
              data.body.history.map(history => (
                <View className="flex w-full flex-row justify-between items-start py-4 border-b border-gray-300">
                  <View className="flex flex-row items-start gap-4">
                    <View
                      className={
                        'h-[64px] w-[64px] bg-gray-200 flex items-center justify-center rounded-full'
                      }
                    >
                      <Truck size={32} color="black" />
                    </View>
                    <View className="flex justify-between">
                      <View className="flex flex-row items-center">
                        <Text className="text-lg font-bold color-black font-inter">
                          {history.location}
                        </Text>
                        <Text className="text-md color-gray-500 ml-2 font-inter">
                          • {moment(history.date).format('DD/MM/YYYY HH:mm')}
                        </Text>
                      </View>
                      <Text className="font-inter mb-2 break-words w-[250px]">
                        {history.status}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
