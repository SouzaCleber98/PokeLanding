'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateUserSchema } from '@/lib/schemas';
import { updateUser } from '@/actions/user';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { handleDelete } from '@/actions/utils';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from '../ui/dialog';

type AuthFormValues = z.infer<typeof updateUserSchema>;

export default function UserForm({
  setState,
}: {
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = async (data: AuthFormValues) => {
    const response = await updateUser(data);

    if (!response.success) {
      response.error &&
        console.error(`${response.error},status:${response.status}`);
      console.log(`${response.message},status:${response.status}`); //TODO: mostrar modal
      return;
    }

    console.log(`${response.message},status:${response.status}`); //TODO: mostrar modal

    setState?.(false);
  };

  return (
    <div className='py-5 px-3 border-zinc-300 border rounded-4xl shadow-xl'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 p-6'
      >
        <h1 className='text-xl font-bold text-center mb-3'>Editar usuário</h1>

        <div className='flex flex-col gap-2'>
          <label htmlFor='username' className='text-sm'>
            Nome de usuário
          </label>
          <input
            id='username'
            {...register('username')}
            className={cn(
              'rounded-xl border h-11 p-2',
              errors.username && 'border-red-500'
            )}
          ></input>
          {errors.username && (
            <p className='text-sm text-red-600'>
              {String(errors.username.message)}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-sm'>
            Email
          </label>
          <input
            id='email'
            {...register('email')}
            className={cn(
              'rounded-xl border h-11 p-2',
              errors.email && 'border-red-500'
            )}
          ></input>
          {errors.email && (
            <p className='text-sm text-red-600'>
              {String(errors.email.message)}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='password' className='text-sm'>
            Senha
          </label>
          <input
            id='password'
            {...register('password')}
            className={cn(
              'rounded-xl border h-11 p-2',
              errors.password && 'border-red-500'
            )}
          ></input>
          {errors.password && (
            <p className='text-sm text-red-600'>
              {String(errors.password.message)}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='confirmPassword' className='text-sm'>
            Confirmar senha
          </label>
          <input
            id='confirmPassword'
            {...register('confirmPassword')}
            className={cn(
              'rounded-xl border h-11 p-2',
              errors.confirmPassword && 'border-red-500'
            )}
          ></input>
          {errors.confirmPassword && (
            <p className='text-sm text-red-600'>
              {String(errors.confirmPassword.message)}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2 sm:flex-row'>
          <Button
            disabled={isSubmitting}
            type='submit'
            variant='default'
            className='bg-green-600 flex-1'
          >
            editar
          </Button>

          <Button
            type='button'
            variant='outline'
            className='flex-1'
            onClick={() => setState?.(false)}
          >
            cancelar
          </Button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button type='button' variant='destructive'>
              deletar dados
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Excluir conta?</DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita. Todos os seus dados serão
                removidos permanentemente.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  cancelar
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button
                  type='button'
                  variant='destructive'
                  onClick={handleDelete}
                >
                  confirmar exclusão
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}
