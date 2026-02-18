'use client';

import { Generation, PokeApiResponse } from '@/lib/api/poke-api/types';
import { FieldGroup, Field, FieldLabel } from '../field';
import { Checkbox } from '../checkbox';

type FilterPanelProps = {
  generationList: PokeApiResponse;
  generation: string;
  setGeneration: (value: Generation) => void;
};

export default function FilterPanel({
  generationList,
  generation,
  setGeneration,
}: FilterPanelProps) {
  return (
    <>
      <FieldGroup className='mx-auto w-56'>
        <Field orientation='horizontal' data-invalid>
          <Checkbox
            checked={generation === 'all'}
            id='all'
            name='all'
            defaultChecked
            onCheckedChange={() => setGeneration('all')}
          />
          <FieldLabel htmlFor='all'>all</FieldLabel>
        </Field>

        {generationList?.results.map(({ name }) => (
          <Field key={name} orientation='horizontal' data-invalid>
            <Checkbox
              checked={generation === name}
              id={name}
              name={name}
              onCheckedChange={() => setGeneration(name as Generation)}
            />
            <FieldLabel htmlFor={name}>{name}</FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </>
  );
}
