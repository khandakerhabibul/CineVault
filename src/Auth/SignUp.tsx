import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import { auth } from 'src/firebase/firebase';
import Button from 'components/Button/Button';
import Input from 'components/FormComponents/Input';
import { useNavigate } from 'react-router-dom';
import { movieListFullPath } from 'modules/MovieList/moduleInfo';
import Spinner from 'components/Spinner/Spinner';
import { LOGIN_PATH } from 'src/common/constant';
import Logo from 'components/Logo/Logo';
import { useToast } from 'src/context/ToastContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [signUpError, setSignUpError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      showToast('Passwords do not match!', 'warning');
      return;
    }
    setError('');

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        showToast(
          'Account created successfully! Welcome to CineVault.',
          'success',
        );
        navigate(movieListFullPath);
      })
      .catch((err) => {
        console.error(err);
        const errorMessage =
          err?.message || 'Sign up failed. Please try again.';
        showToast(errorMessage, 'danger');
        setSignUpError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isSubmitButtonDisabled =
    !email || !password || !confirmPassword || isLoading;

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-(--bg-primary) p-4'>
      {/* Branding Logo */}
      <div className='absolute top-8 left-8'>
        <Logo size='md' />
      </div>

      <div className='mt-10 bg-(--bg-secondary) rounded-xl shadow-(--card-shadow p-6 md:p-10 w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-(--text-primary) text-center'>
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Email */}
          <Input
            label='Email'
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            fullWidth
          />

          {/* Password */}
          <Input
            label='Password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            fullWidth
            suffix={() => (
              <span onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            )}
          />

          {/* Confirm Password */}
          <Input
            label='Confirm Password'
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Re-enter your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            disabled={isLoading}
            error={error}
            suffix={() => (
              <span onClick={() => setShowConfirmPassword((p) => !p)}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            )}
          />

          {/* Submit Button */}
          <Button
            type='submit'
            fullWidth
            variant='primary'
            size='md'
            disabled={isSubmitButtonDisabled}
          >
            {isLoading ? <Spinner color='tertiary' /> : 'Sign Up'}
          </Button>
          {signUpError && (
            <p className='mb-5 text-center text-(--danger) text-sm'>
              {signUpError}
            </p>
          )}
        </form>

        {/* Extra text */}
        <p className='mt-5 text-center text-(--text-secondary) text-sm'>
          Already have an account?{' '}
          <a
            href={LOGIN_PATH}
            className='text-(--color-primary) hover:underline'
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
