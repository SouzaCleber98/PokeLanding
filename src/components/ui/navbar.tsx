'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { navigationLinks } from '@/constants';
import { useAuth } from '@/context/auth-context/auth-provider';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  const visibleLinks = isAuthenticated
    ? navigationLinks.filter(
        ({ href }) => href !== '/sign-in' && href !== '/sign-up'
      )
    : navigationLinks;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setIsMobileMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const navigationMenu = document.getElementById('nav-menu');
    const handleClick = (e: Event) => {
      if (!navigationMenu?.contains(e.target as Node))
        setIsMobileMenuOpen(false);
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <nav className='flex items-center' id='nav-menu'>
      <Button
        variant='ghost'
        className='sm:hidden'
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        id='mobile-menu'
      >
        <FontAwesomeIcon
          className='text-2xl'
          icon={isMobileMenuOpen ? faXmark : faBars}
        />
      </Button>

      <div
        className={cn(
          'flex relative',
          isMobileMenuOpen && 'flex-col w-full absolute right-0 top-20'
        )}
      >
        <ul
          className={cn(
            'sm:flex sm:flex-row gap-3',
            isMobileMenuOpen
              ? 'flex flex-col justify-center text-center bg-yellow-300'
              : 'hidden'
          )}
        >
          {visibleLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  isMobileMenuOpen
                    ? 'block px-6 py-3 text-center font-semibold text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-200 border-b border-yellow-500/30 last:border-b-0'
                    : [
                        'px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200',
                        'text-gray-800 hover:bg-red-500 hover:text-white hover:shadow-md',
                        label === 'Cadastro' &&
                          'bg-red-500 text-white shadow-md hover:bg-red-600',
                      ]
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
