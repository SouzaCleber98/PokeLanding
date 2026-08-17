'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { signInSchema } from '@/lib/schemas';
import { signUpSchema } from '@/lib/schemas';
import Link from 'next/link';
import { FORM_FIELDS } from '@/constants';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type AuthSchemaType = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type AuthFormProps = {
  type: 'SIGN_IN' | 'SIGN_UP';
  onSuccessAction?: (data: AuthSchemaType) => Promise<{
        success: boolean;
    error?: string[];
        status: number;
        message: string;
  }>; //TODO: arumar tipo
};

export default function AuthForm({ type, onSuccessAction }: AuthFormProps) {
  const router = useRouter();

  const schema = type === 'SIGN_IN' ? signInSchema : signUpSchema;
  const isSignIn = type === 'SIGN_IN';

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: AuthSchemaType) => {
    if (!onSuccessAction) return;

    try {
      const response = await onSuccessAction(data);

      if (!response.success) {
        if (isSignIn) {
          setError('password', {
            type: 'server',
            message: response.message,
          });
        }

        setError('email', {
          type: 'server',
          message: response.message,
        });

        response.error &&
          console.error(`${response.error},status:${response.status}`);
        console.log(`${response.message},status:${response.status}`); //TODO: mostrar modal
        return;
      }

      console.log(`${response.message},status:${response.status}`); //TODO: mostrar modal
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  //TODO: trocar Object.keys por algo mais seguro, tipo um array com os campos
  return (
    <div className='py-5 px-3 border-zinc-300 border rounded-4xl  shadow-xl'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 p-6'
      >
        <h1 className='text-xl font-bold text-center mb-3'>
          {isSignIn ? 'Entrar na conta' : 'Criar conta'}
        </h1>

        {(Object.keys(schema.shape) as (keyof AuthSchemaType)[]).map((item) => (
          <div className='flex flex-col gap-2' key={item}>
            <label htmlFor={item} className='text-sm'>
              {FORM_FIELDS[item].label}
            </label>

            <input
              id={item}
              placeholder={FORM_FIELDS[item].placeholder}
              {...register(item)}
              type={FORM_FIELDS[item].type}
              className={cn(
                'rounded-xl border h-11 p-2',
                errors[item] && 'border-red-500'
              )}
            ></input>

            {errors[item] && (
              <p className='text-sm text-red-600'>
                {String(errors[item].message)}
              </p>
            )}
          </div>
        ))}

        <Button disabled={isSubmitting} type='submit' className='bg-green-600'>
          {isSignIn ? 'Entrar' : 'Cadastrar'}
        </Button>
      </form>

      <p className='text-sm text-center'>
        {isSignIn ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
        {
          <Link href={isSignIn ? '/sign-up' : '/sign-in'} className='font-bold'>
            {isSignIn ? 'Cadastrar' : 'Login'}
          </Link>
        }
      </p>
    </div>
  );
}
