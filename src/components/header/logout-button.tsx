'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../ui/button';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

type LogoutButtonProps = {
  handleLogoutAction: () => Promise<void>;
};

export default function LogoutButton({
  handleLogoutAction,
}: LogoutButtonProps) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='ml-1 h-7 w-7 text-gray-700 hover:bg-red-500 hover:text-white'
      onClick={() => handleLogoutAction()}
      title='Deslogar'
    >
      <FontAwesomeIcon icon={faRightFromBracket} className='text-sm' />
    </Button>
  );
}
