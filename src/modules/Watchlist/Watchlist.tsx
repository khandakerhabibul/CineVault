import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate, Link } from 'react-router-dom';
import { useWatchlist } from 'src/hooks/useWatchlist';
import { movieListFullPath } from '../MovieList/moduleInfo';
import ContentCard from '../MovieList/common/ContentCard';
import Spinner from 'components/Spinner/Spinner';
import { Heart, Clapperboard } from 'lucide-react';
import Button from 'components/Button/Button';
import { useWatchlistMoviesQuery } from './query/useWatchlistMoviesQuery';

function Watchlist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { watchlistIds, isLoading: isWatchlistLoading } = useWatchlist();
  const { data: movies, isLoading: isMoviesLoading } =
    useWatchlistMoviesQuery(watchlistIds);

  console.log({
    isWatchlistLoading,
    watchlistIds,
    watchlistIdsLenth: watchlistIds.length > 0,
    isMoviesLoading,
  });

  const isLoading =
    isWatchlistLoading || (watchlistIds.length > 0 && isMoviesLoading);

  useGSAP(
    () => {
      if (movies.length > 0) {
        gsap.from('.movie-card', {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set('.movie-card', { clearProps: 'all' });
          },
        });
      }
    },
    { dependencies: [movies.length], scope: containerRef },
  );

  return (
    <div
      className='min-h-screen bg-(--bg-primary) pt-24 md:pt-36 pb-20 px-6 md:px-16 overflow-x-hidden'
      ref={containerRef}
    >
      <div className='max-w-7xl mx-auto'>
        <div className='mb-12'>
          <h1 className='text-4xl md:text-5xl font-black tracking-tight text-white flex items-center gap-4'>
            My <span className='text-(--color-primary)'>Watchlist</span>
            <Heart size={32} className='text-(--color-primary) fill-current' />
          </h1>
          <p className='text-(--text-secondary) mt-2 text-lg'>
            Movies you've saved to watch later.
          </p>
        </div>

        {isLoading ? (
          <div className='flex flex-col items-center justify-center py-20 gap-4'>
            <Spinner />
            <p className='text-(--text-secondary) animate-pulse'>
              Gathering your favorites...
            </p>
          </div>
        ) : movies.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 w-full'>
            {movies.map((movie, index) => (
              <div
                key={`${movie.id}-${index}`}
                className='movie-card relative group'
              >
                <Link to={`${movieListFullPath}/${movie.id}`}>
                  <ContentCard content={movie} variant='movies-list' />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-32 text-center'>
            <div className='w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 relative'>
              <Heart size={48} className='text-white/10' />
              <Clapperboard
                size={24}
                className='absolute -bottom-2 -right-2 text-(--color-primary) opacity-50'
              />
            </div>
            <h2 className='text-2xl text-white mb-2 font-black tracking-tight'>
              Your watchlist is empty
            </h2>
            <p className='text-(--text-secondary) max-w-md mb-8'>
              Looks like you haven't added any movies yet. Start exploring and
              click the heart icon to save them here!
            </p>
            <Button
              variant='primary'
              size='lg'
              onClick={() => navigate(movieListFullPath + '/all-movies')}
              className='flex items-center gap-2'
            >
              Explore Movies
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
