import {MoreVertical, Package} from 'lucide-react-native';
import {Text, TouchableOpacity, View} from 'react-native';
import Badge from './badge';

interface DeliveryItemProps {
  status: 'pending' | 'delivered' | 'canceled';
}

const iconColor = {
  pending: '#ca8a04',
  delivered: '#16a34a',
  canceled: '#dc2626',
};

const roundColor = {
  pending: 'bg-yellow-200',
  delivered: 'bg-green-200',
  canceled: 'bg-red-200',
};

const labelStatus = {
  pending: 'Pendente',
  delivered: 'Entregue',
  canceled: 'Não entregue',
};

const badgeStatus = {
  pending: 'pending',
  delivered: 'success',
  canceled: 'destructive',
};

export default function DeliveryItem({status}: DeliveryItemProps) {
  return (
    <View className="flex w-full flex-row justify-between items-start py-4">
      <View className="flex flex-row gap-4">
        <View
          className={`h-[64px] w-[64px] ${roundColor[status]} flex items-center justify-center rounded-full`}
        >
          <Package size={32} color={iconColor[status]} />
        </View>
        <View className="flex justify-between">
          <View className="flex flex-row items-center">
            <Text className="text-lg font-bold color-black font-inter">
              #AB1122334CD
            </Text>
            <Text className="text-md color-gray-500 ml-2 font-inter">
              • 15 may 24
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <Text className="text-md color-gray-500 font-inter">
              Status da Entrega:
            </Text>
            <Badge
              variant={badgeStatus[status] as any}
              label={labelStatus[status]}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity>
        <MoreVertical size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
}
