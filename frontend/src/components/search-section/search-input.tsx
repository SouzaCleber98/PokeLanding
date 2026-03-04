'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import useGenerateSearchParams from '@/hooks/useGenerateSearchParams';
import { cn } from '@/lib/utils';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function SearchInput() {
  const setSearchParams = useGenerateSearchParams();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search')?.toString().trim().toLowerCase();

    if (!search?.length) return;
    setSearchParams('search', search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        className={cn(
          'border-red-300 bg-white overflow-hidden',
          'has-[[data-slot=input-group-control]:focus-visible]:ring-blue-600!'
        )}
      >
        <InputGroupInput
          name='search'
          className='text-center placeholder:text-gray-400'
          placeholder='Search Pokémon by name or number...'
        />
        <InputGroupAddon>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </InputGroupAddon>
        <InputGroupAddon
          className='border-l-2 border-l-gray-400'
          align='inline-end'
        >
          <InputGroupButton
            size='sm'
            type='submit'
            variant='ghost'
            className='rounded-full hover:bg-transparent'
          >
            <span>Search</span>
            <Image
              src='/images/pokeball.png'
              alt='search-button'
              width={20}
              height={20}
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
