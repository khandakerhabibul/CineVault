import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from 'src/firebase/firebase';
import Loader from 'src/components/Loader/Loader';
import { movieListFullPath } from 'modules/MovieList/moduleInfo';

type UserDataInitialState = User;

type AuthProviderType = {
  isLoading: boolean;
  userData?: UserDataInitialState | null;
  handleLogout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const LoginContext = createContext<AuthProviderType>({
  isLoading: false,
  handleLogout: () => {
    return Promise.reject();
  },
  refreshUser: () => {
    return Promise.reject();
  },
});

type PropType = {
  children: React.ReactNode | null;
};

function AuthProvider({ children }: PropType) {
  const navigate = useNavigate();

  const [isUserDataLoading, setIsUserDataLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserDataInitialState | null>(null);

  const handleLogout = async () => {
    setIsUserDataLoading(true);

    signOut(auth)
      .then(() => {
        navigate(movieListFullPath);
        setUserData(null);
      })
      .finally(() => {
        setIsUserDataLoading(false);
      });
  };

  const refreshUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUserData({ ...auth.currentUser });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserData(currentUser);
      setIsUserDataLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLoading: isUserDataLoading,
        userData,
        handleLogout,
        refreshUser,
      }}
    >
      {isUserDataLoading && <Loader />}
      {children}
    </LoginContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  const { isLoading, userData, handleLogout, refreshUser } =
    useContext(LoginContext);
  return { isLoading, userData, handleLogout, refreshUser };
};
