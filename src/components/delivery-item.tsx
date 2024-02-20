import {Package} from 'lucide-react-native';
import {Text, TouchableOpacity, View} from 'react-native';
import Badge from './badge';
import {z} from 'zod';
import {PacketSchema} from '../services/packet/packet.schemas';
import moment from 'moment';

interface DeliveryItemProps {
  packet: z.infer<typeof PacketSchema>;
}

const iconColor = {
  'Objeto postado': '#ca8a04',
  'Objeto encaminhado': '#ca8a04',
  'Objeto saiu para entrega ao destinatário': '#ca8a04',
  'Objeto entregue ao destinatário': '#16a34a',
};

const roundColor = {
  'Objeto postado': 'bg-yellow-200',
  'Objeto encaminhado': 'bg-yellow-200',
  'Objeto saiu para entrega ao destinatário': 'bg-yellow-200',
  'Objeto entregue ao destinatário': 'bg-green-200',
};

const badgeStatus = {
  'Objeto postado': 'pending',
  'Objeto encaminhado': 'pending',
  'Objeto saiu para entrega ao destinatário': 'pending',
  'Objeto entregue ao destinatário': 'success',
};

export default function DeliveryItem({packet}: DeliveryItemProps) {
  const status = packet.history[0].status;

  return (
    <TouchableOpacity className="flex w-full flex-row justify-between items-start py-4">
      <View className="flex flex-row items-center gap-4">
        <View
          className={`h-[64px] w-[64px] ${roundColor[status]} flex items-center justify-center rounded-full`}
        >
          <Package size={32} color={iconColor[status]} />
        </View>
        <View className="flex justify-between">
          <View className="flex flex-row items-center">
            <Text className="text-lg font-bold color-black font-inter">
              {packet.code}
            </Text>
            <Text className="text-md color-gray-500 ml-2 font-inter">
              • {moment(packet.history[0].date).format('DD/MM/YYYY HH:mm')}
            </Text>
          </View>
          <Text className="font-inter mb-2">{packet.name}</Text>
          <View className="flex flex-row items-center">
            <Badge variant={badgeStatus[status] as any} label={status} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
