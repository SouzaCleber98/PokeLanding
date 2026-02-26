import { STAT_NAMES } from '@/constants';
import { StatName } from '@/lib/api/poke-api/types';
import { cn } from '@/lib/utils';

type StatBarProps = {
  statName: StatName;
  value: number;
  maxValue?: number;
};

const getBarColor = (value: number) => {
  if (value < 30) return 'bg-red-600';
  if (value < 60) return 'bg-orange-600';
  if (value < 90) return 'bg-yellow-300';
  if (value < 120) return 'bg-green-300';
  if (value < 140) return 'bg-green-600';
  return 'bg-green-800';
};

export default function StatBar({
  statName,
  value,
  maxValue = 255,
}: StatBarProps) {
  return (
    <div className='w-full flex gap-4 justify-between items-center text-sm hover:scale-102 duration-150 '>
      <div className='w-14'>
        <span className='text-start uppercase font-bold text-white/60'>
          {STAT_NAMES[statName]}:
        </span>
      </div>

      <div className='flex-1 bg-white rounded-full overflow-hidden border border-border'>
        <div
          className={cn('h-5', getBarColor(value))}
          style={{ width: `${(value / maxValue) * 100}%` }}
        ></div>
      </div>

      <div className='w-12 text-center'>
        <span className='text-end text-white font-bold'>{value}</span>
      </div>
    </div>
  );
}
