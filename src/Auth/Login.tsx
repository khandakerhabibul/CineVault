import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import { auth } from 'src/firebase/firebase';
import Button from 'components/Button/Button';
import Input from 'components/FormComponents/Input';
import { movieListFullPath } from 'modules/MovieList/moduleInfo';
import Spinner from 'components/Spinner/Spinner';
import Logo from 'components/Logo/Logo';
import { useToast } from 'src/context/ToastContext';

function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      showToast('Email and password are required', 'warning');
      return;
    }

    setError('');

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showToast('Successfully logged in! Welcome back.', 'success');
        navigate(movieListFullPath);
      })
      .catch((err) => {
        console.error({ err });
        const errorMessage =
          err?.message || 'Login failed. Please check your credentials.';
        showToast(errorMessage, 'danger');
        setLoginError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isLoginButtonDisabled = !email || !password || isLoading;

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-(--bg-primary) p-4'>
      {/* Branding Logo */}
      <div className='absolute top-8 left-8'>
        <Logo size='md' />
      </div>

      <div className='mt-10 bg-(--bg-secondary) shadow-(--card-shadow) rounded-xl p-10 w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center text-(--text-primary) mb-6'>
          Login
        </h2>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <Input
            label='Email'
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <Input
            label='Password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            error={error}
            suffix={() => (
              <span onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            )}
          />

          <Button
            type='submit'
            variant='primary'
            size='md'
            fullWidth
            disabled={isLoginButtonDisabled}
          >
            {isLoading ? <Spinner color='tertiary' /> : 'Login'}
          </Button>

          {loginError && (
            <p className='text-center text-sm text-(--danger)'>{loginError}</p>
          )}
        </form>

        <p className='mt-5 text-center text-sm text-(--text-secondary)'>
          Don’t have an account?{' '}
          <a
            href='/signup'
            className='text-(--color-primary) hover:text-(--color-primary-hover) transition'
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
