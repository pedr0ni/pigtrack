import {Bell, PiggyBank, Search} from 'lucide-react-native';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input} from '../components/input';
import DeliveryItem from '../components/delivery-item';
import {useToast} from '../components/toast';

function getRandomState() {
  const randomValue = Math.random();

  if (randomValue < 0.33) {
    return 'delivered';
  } else if (randomValue < 0.66) {
    return 'canceled';
  } else {
    return 'pending';
  }
}

export default function HomeScreen() {
  const {toast} = useToast();

  const onAddPacket = () => {
    toast('Encomenda adicionada com sucesso!', 'success');
  };

  return (
    <View className="flex-1">
      <SafeAreaView className="bg-slate-800">
        <View className="flex px-4 pb-4">
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row justify-center items-center gap-2">
              <PiggyBank color="white" size={48} />
              <Text className="text-lg color-white font-medium font-inter">
                PigTrack
              </Text>
            </View>

            <TouchableOpacity>
              <Bell color="white" size={28} />
            </TouchableOpacity>
          </View>

          <View className="flex gap-4 mt-4">
            <View className="mt-6">
              <Text className="text-2xl font-bold color-white font-inter">
                Procure sua encomenda
              </Text>
              <Text className="text-gray-300 font-inter">
                Adicione o código de rastreamento para procurar por uma
                encomenda
              </Text>
            </View>

            <View className="relative flex flex-col items-center justify-center">
              <Input
                className="bg-white rounded-[8px] w-full"
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

      <ScrollView className="flex-1 px-4">
        <Text className="text-2xl mt-4 text-gray-900 font-bold font-inter">
          Minhas encomendas
        </Text>

        {/* <View className="flex mt-2 h-[600px]"> */}
        <View className="flex">
          {[1, 2, 3, 4, 5, 6, 7].map(item => (
            <DeliveryItem status={getRandomState()} key={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
