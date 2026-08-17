'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import UserForm from '../forms/user-form';
import UserDetails from './user-details';

type UserInfoSectionProps = {
  username: string;
  email: string;
};

export default function UserInfoSection({
  username,
  email,
}: UserInfoSectionProps) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <section className='w-screen h-screen flex flex-col justify-center items-center my-20'>
      {isEdit ? (
        <UserForm setState={setIsEdit} />
      ) : (
        <UserDetails username={username} email={email} />
      )}

      <div className='flex gap-3 mt-4'>
        {!isEdit && (
          <Button
            variant='default'
            className='bg-green-600'
            onClick={() => setIsEdit(!isEdit)}
          >
            editar dados
          </Button>
        )}
      </div>
    </section>
  );
}
