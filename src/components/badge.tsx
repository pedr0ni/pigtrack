import {type VariantProps, cva} from 'class-variance-authority';
import {Text, View} from 'react-native';

import {cn} from '../../lib/utils';

const badgeVariants = cva(
  'flex flex-row items-center rounded-full px-2 py-1 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        destructive: 'bg-red-400',
        success: 'bg-green-300 dark:bg-green-200',
        pending: 'bg-yellow-300 dark:bg-yellow-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva('font-medium text-center text-xs', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-red-600',
      success: 'text-green-600',
      pending: 'text-yellow-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {
  label: string;
  labelClasses?: string;
}
export default function Badge({
  label,
  labelClasses,
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <View className={cn(badgeVariants({variant}), className)} {...props}>
      <Text className={cn(badgeTextVariants({variant}), labelClasses)}>
        {label}
      </Text>
    </View>
  );
}

export {badgeVariants};
