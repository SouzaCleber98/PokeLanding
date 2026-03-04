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
    <>
      <Button
        size='icon'
        className='rounded-full fixed top-1/2 left-2'
        onClick={handleLeftClick}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>
      <Button
        size='icon'
        className='rounded-full fixed top-1/2 right-2'
        onClick={handleRightClick}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </>
  );
}
