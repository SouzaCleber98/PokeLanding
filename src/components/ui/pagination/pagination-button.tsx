import { Button } from '../button';
import { cn } from '@/lib/utils';

export default function PaginationButton({
  className,
  children,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <Button
      size='icon'
      className={cn(
        'rounded-full border-2 border-red-500 bg-white text-red-600',
        'hover:bg-red-500 hover:text-white',
        'disabled:border-gray-300 disabled:text-gray-300 disabled:bg-gray-100',
        'duration-300',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
