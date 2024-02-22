import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../router/routes.types';
import {packetClient} from '../services/packet/packet.client';
import moment from 'moment';
import {CheckCircle, CheckCircle2, Truck} from 'lucide-react-native';

export default function PacketScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Packet'>) {
  const id = route.params?.id ?? '';
  console.log(id);
  const {data, error, isLoading} = packetClient.getPacket.useQuery(
    ['packet', id],
    {
      params: {id},
    }
  );

  return (
    <SafeAreaView className="flex-1 dark:bg-slate-900">
      <View className="flex-1 p-4">
        <View>
          <Text className="font-inter text-2xl font-bold text-gray-800 dark:text-white">
            {data?.body.code}
          </Text>
          <Text className="font-inter text-xl text-gray-600">
            {data?.body.name}
          </Text>
        </View>

        <ScrollView className="flex-1">
          {data &&
            data.body.history.map(history => (
              <View className="flex w-full flex-row justify-between items-start py-4">
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
  );
}
