import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

export default function Button({children, ...rest}: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      className="h-12 bg-slate-800 rounded-[8px] flex items-center justify-center dark:bg-white"
      {...rest}
    >
      <Text className="font-inter text-white font-bold text-lg dark:text-slate-800">
        {children}
      </Text>
    </TouchableOpacity>
  );
}
