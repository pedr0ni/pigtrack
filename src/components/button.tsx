import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

export default function Button({children, ...rest}: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      className="h-12 bg-slate-800 rounded-[8px] flex items-center justify-center"
      {...rest}
    >
      <Text className="font-inter text-white font-bold text-lg">
        {children}
      </Text>
    </TouchableOpacity>
  );
}
