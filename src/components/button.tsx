import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
}

export default function Button({children, isLoading, ...rest}: ButtonProps) {
  const scheme = useColorScheme();
  return (
    <TouchableOpacity
      disabled={isLoading}
      className="h-12 bg-slate-800 rounded-[8px] flex items-center justify-center dark:bg-white"
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={scheme === 'light' ? 'white' : 'black'} />
      ) : (
        <Text className="font-inter text-white font-bold text-lg dark:text-slate-800">
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
