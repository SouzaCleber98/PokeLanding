'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../button';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { handleLogout } from '@/actions/utils';

export default function LogoutButton() {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='ml-1 h-7 w-7 text-gray-700 hover:bg-red-500 hover:text-white'
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleLogout();
      }}
      title='Deslogar'
    >
      <FontAwesomeIcon icon={faRightFromBracket} className='text-sm' />
    </Button>
  );
}
