import {UseFormReturn} from 'react-hook-form';
import {Text, TextInput, TouchableOpacity, View, ViewProps} from 'react-native';
import {cn} from '../../lib/utils';
import {ReactNode} from 'react';

interface FormInputProps extends ViewProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  className?: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  onIconPress?: () => void;
}

export default function FormInput({
  form,
  name,
  label,
  icon,
  onIconPress,
  placeholder,
  secureTextEntry,
  ...props
}: FormInputProps) {
  const errors = form.formState.errors[name];

  return (
    <View {...props}>
      <Text
        className={cn(
          'font-inter mb-1',
          errors ? 'text-red-500 dark:text-red-400' : ''
        )}
      >
        {label}
      </Text>
      <View className="relative flex justify-center">
        <TextInput
          placeholder={placeholder}
          className={cn(
            'border border-gray-300 h-12 rounded-[8px] px-2',
            errors ? 'border-red-500 dark:border-red-400' : ''
          )}
          onChange={e => form.setValue(name, e.nativeEvent.text)}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity onPress={onIconPress} className="absolute right-4">
          {icon}
        </TouchableOpacity>
      </View>
      {errors && (
        <Text className="text-red-500 dark:text-red-400 mt-1">
          {errors.message?.toString()}
        </Text>
      )}
    </View>
  );
}
