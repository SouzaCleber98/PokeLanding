import { signUp } from '@/actions/auth';
import AuthForm from '@/components/forms/auth-form';

export default function SignUpPage() {
  return <AuthForm type='SIGN_UP' onSuccessAction={signUp} />;
}
