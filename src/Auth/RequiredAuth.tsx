import Loader from 'components/Loader/Loader';
import { Suspense, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { LOGIN_PATH } from 'src/common/constant';
import { useAuth } from 'src/context/AuthProvider';

type PropType = {
  children: React.ReactNode;
  skipPermission?: boolean;
};
const RequiredAuth = ({ children, skipPermission }: PropType): JSX.Element => {
  const { userData, isLoading } = useAuth();

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );

  if (!userData) {
    return <Navigate to={LOGIN_PATH} state={{ path: location.pathname }} />;
  }

  if (skipPermission) return <>{children}</>;
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default RequiredAuth;
