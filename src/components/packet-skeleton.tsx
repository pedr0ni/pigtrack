import {View} from 'react-native';
import Skeleton from './skeleton';

export default function PacketSkeleton() {
  return (
    <View className="flex flex-row items-center mt-4">
      <Skeleton classes="h-[64px] w-[64px] rounded-full" />
      <View className="flex ml-2">
        <Skeleton classes="h-[10px] w-[120px] rounded-[8px]" />
        <Skeleton classes="h-[10px] w-[220px] rounded-[8px] mt-2" />
      </View>
    </View>
  );
}
