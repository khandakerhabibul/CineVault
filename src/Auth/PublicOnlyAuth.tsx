import { Navigate } from 'react-router-dom';
import { movieListFullPath } from 'modules/MovieList/moduleInfo';
import Loader from 'components/Loader/Loader';
import { useAuth } from 'src/context/AuthProvider';

type Props = {
  children: React.ReactNode;
};

function PublicOnlyAuth({ children }: Props) {
  const { userData, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  // NOTE - if user is already logged in then redirect to content-list route
  if (userData) {
    return <Navigate to={movieListFullPath} replace />;
  }

  return <>{children}</>;
}

export default PublicOnlyAuth;
