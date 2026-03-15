import { Suspense } from 'react';
import { useOutlet } from 'react-router-dom';
import Loader from 'src/components/Loader/Loader';
import AuthProvider from 'src/context/AuthProvider';
import { WatchlistProvider } from 'src/context/WatchlistContext';
import { ToastProvider } from 'src/context/ToastContext';
import ToastContainer from 'components/Toast/ToastContainer';

const AuthLayout = () => {
  const outlet = useOutlet();

  return (
    <Suspense fallback={<Loader />}>
      <ToastProvider>
        <AuthProvider>
          <WatchlistProvider>
            {outlet}
            <ToastContainer />
          </WatchlistProvider>
        </AuthProvider>
      </ToastProvider>
    </Suspense>
  );
};

export default AuthLayout;
