import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from 'src/firebase/firebase';
import { useAuth } from 'src/context/AuthProvider';
import { useToast } from './ToastContext';

interface WatchlistContextType {
  watchlistIds: number[];
  toggleWatchlist: (movieId: number) => Promise<void>;
  isLoading: boolean;
  isWatchlisted: (id: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
);

export const WatchlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userData } = useAuth();
  const { showToast } = useToast();
  const [watchlistIds, setWatchlistIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(!!userData?.uid);

  const watchlistSet = useMemo(() => new Set(watchlistIds), [watchlistIds]);

  // NOTE - Handle state reset on logout
  useEffect(() => {
    if (!userData?.uid) {
      queueMicrotask(() => {
        setWatchlistIds((prev) => (prev.length === 0 ? prev : []));
        setIsLoading((prev) => (!prev ? prev : false));
      });
    }
  }, [userData?.uid]);

  // NOTE - Single global listener for the entire app
  useEffect(() => {
    if (!userData?.uid) return;

    const watchlistRef = doc(db, 'watchlists', userData.uid);
    // Loading is already initialized based on userData.uid in useState

    const unsubscribe = onSnapshot(
      watchlistRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWatchlistIds(data.movieIds || []);
        } else {
          setWatchlistIds([]);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error('Firestore Watchlist Snapshot error:', error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [userData?.uid]);

  const toggleWatchlist = useCallback(
    async (movieId: number) => {
      if (!userData?.uid) {
        showToast('Login required to manage watchlist', 'warning');
        return;
      }

      const watchlistRef = doc(db, 'watchlists', userData.uid);
      const isAlreadyWatchlisted = watchlistSet.has(movieId);

      try {
        const docSnap = await getDoc(watchlistRef);

        if (!docSnap.exists()) {
          await setDoc(watchlistRef, {
            movieIds: [movieId],
            updatedAt: new Date().toISOString(),
          });
          showToast('Added to watchlist', 'success');
        } else {
          await updateDoc(watchlistRef, {
            movieIds: isAlreadyWatchlisted
              ? arrayRemove(movieId)
              : arrayUnion(movieId),
            updatedAt: new Date().toISOString(),
          });
          showToast(
            isAlreadyWatchlisted
              ? 'Removed from watchlist'
              : 'Added to watchlist',
            isAlreadyWatchlisted ? 'info' : 'success',
          );
        }
      } catch (error) {
        console.error('Error toggling watchlist:', error);
        showToast('Failed to update watchlist', 'danger');
      }
    },
    [userData, watchlistSet, showToast],
  );

  const isWatchlisted = useCallback(
    (id: number) => watchlistSet.has(id),
    [watchlistSet],
  );

  const value = useMemo(
    () => ({
      watchlistIds,
      toggleWatchlist,
      isLoading,
      isWatchlisted,
    }),
    [watchlistIds, isLoading, toggleWatchlist, isWatchlisted],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlistContext = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error(
      'useWatchlistContext must be used within a WatchlistProvider',
    );
  }
  return context;
};
