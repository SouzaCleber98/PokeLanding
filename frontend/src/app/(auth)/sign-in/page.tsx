'use client';

import AuthForm from '@/components/forms/auth-form';
export default function SignInPage() {
  return (
    <AuthForm
      type='SIGN_IN'
      onSuccess={(data) =>
        fetch('http://localhost:4000/sessions', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ ...data }),
        })
      }
    />
  );
}
