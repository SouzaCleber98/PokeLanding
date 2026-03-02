'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from './button';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { POKEMONSBYGENERATION } from '@/constants';

export default function NavButton() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleLeftClick = () => {
    router.push(
      `${pathname.replace(String(id), String(Number(id) === 1 ? POKEMONSBYGENERATION.all.end : Number(id) - 1))}`
    );
  };

  const handleRightClick = () => {
    router.push(
      `${pathname.replace(String(id), String(Number(id) === POKEMONSBYGENERATION.all.end ? 1 : Number(id) + 1))}`
    );
  };

  return (
    <div className='flex w-full justify-between p-3 fixed top-1/2 right-1'>
      <Button size='icon' className='rounded-full' onClick={handleLeftClick}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>
      <Button size='icon' className='rounded-full' onClick={handleRightClick}>
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </div>
  );
}
