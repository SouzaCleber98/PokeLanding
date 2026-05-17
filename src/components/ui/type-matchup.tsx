import { TypeName } from '@/lib/api/poke-api/types/types';
import TypeIcon from './type-icon';
import { cn } from '@/lib/utils';

type TypeMatchupProps = { type: TypeName; multiplier: number };

const formatDamageMultiplier = (multiplier: number) => {
  if (multiplier >= 1 || multiplier === 0) return multiplier;
  if (multiplier === 0.5) {
    return '½';
  }
  return '¼';
};

const multiplierColor = (multiplier: number) => {
  if (multiplier === 4) return 'bg-red-800 border-red-400 ';
  if (multiplier === 2) return 'bg-red-400 border-red-200 ';
  if (multiplier === 0) return 'bg-gray-600 border-gray-400 ';
  if (multiplier === 0.5) return 'bg-green-600 border-green-400 ';
  if (multiplier === 0.25) return 'bg-green-800 border-green-400 ';
};

export default function TypeMatchup({ type, multiplier }: TypeMatchupProps) {
  return (
    <div className='relative group w-fit h-fit transition-transform duration-200 hover:scale-110'>
      <TypeIcon type={type} size='sm' />
      <span
        className={cn(
          'absolute -right-1.5 -bottom-1.5 flex items-center justify-center',
          'min-w-6 h-6 px-1 rounded-full z-10',
          'text-[10px] font-bold text-white ',
          'border-2',

          multiplierColor(multiplier)
        )}
      >
        x{formatDamageMultiplier(multiplier)}
      </span>
    </div>
  );
}
