import { POKEMON_TYPES_CONSTANTS } from '@/constants';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import generateBgColor from '@/utils/generate-bg-color';

type TypeIconProps = {
  type: keyof typeof POKEMON_TYPES_CONSTANTS;
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

export default function TypeIcon({ type: type, size = 'md' }: TypeIconProps) {
  const badgeSizeClasses = {
    xs: {
      fontSize: 'text-[10px]',
      className: 'px-3 py-1 min-w-15 max-w-15 max-h-5',
      iconSize: 10,
    },
    sm: {
      fontSize: 'text-xs',
      className: 'px-5 py-2 min-w-20 max-w-20 max-h-6',
      iconSize: 16,
    },
    md: {
      fontSize: 'text-md',
      className: 'px-6 py-3 min-w-25 max-w-25 max-h-8',
      iconSize: 20,
    },
    lg: {
      fontSize: 'text-lg',
      className: 'px-7 py-3 min-w-30 max-w-30 max-h-10',
      iconSize: 24,
    },
  };

  const bgColor = generateBgColor(POKEMON_TYPES_CONSTANTS[type].color);

  return (
    <div
      key={type}
      className={cn(
        'flex gap-1 rounded-full justify-center items-center hover:scale-105 transition-all',
        badgeSizeClasses[size].className
      )}
      style={bgColor}
    >
      <Image
        src={POKEMON_TYPES_CONSTANTS[type].icon}
        alt={type}
        width={badgeSizeClasses[size].iconSize}
        height={badgeSizeClasses[size].iconSize}
      />
      <span
        className={cn(
          'font-semibold capitalize text-white',
          badgeSizeClasses[size].fontSize
        )}
      >
        {type}
      </span>
    </div>
  );
}
