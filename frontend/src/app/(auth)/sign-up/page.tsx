'use client';

import AuthForm from '@/components/forms/auth-form';

export default function SignUpPage() {
  return (
    <AuthForm
      type='SIGN_UP'
      onSuccess={(data) =>
        fetch('http://localhost:4000/users', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ ...data }),
        })
      }
    />
  );
}
