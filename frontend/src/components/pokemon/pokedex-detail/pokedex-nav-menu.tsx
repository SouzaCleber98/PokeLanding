'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BASE_LINK = '/pokedex';

export default function PokedexNavMenu({ id }: { id: number }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: `${BASE_LINK}/${id}` },
    { label: 'Stats', href: `${BASE_LINK}/${id}/stats` },
    { label: 'Evolutions', href: `${BASE_LINK}/${id}/evolutions` },
  ];

  return (
    <nav className=' flex my-8 justify-center'>
      <div className='flex p-1 gap-1 md:p-2 md:gap-2 justify-center bg-black/45 rounded-full'>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <div key={item.label} className=''>
              <Link href={item.href} className='flex-1'>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'rounded-full text-xs',
                    isActive
                      ? 'bg-white text-gray-800 hover:bg-white'
                      : 'text-white/80 hover:text-white hover:bg-white/15'
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
