'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import UserForm from '../forms/user-form';

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
    <section className='w-screen h-screen flex flex-col justify-center items-center'>
      {isEdit ? (
        <UserForm setState={setIsEdit} />
      ) : (
        <UserDetails username={username} email={email} />
      )}

      {!isEdit && (
        <Button onClick={() => setIsEdit(!isEdit)}>editar dados</Button>
      )}
    </section>
  );
}
