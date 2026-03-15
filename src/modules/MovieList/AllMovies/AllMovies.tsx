import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useInfiniteScrollDataQuery } from 'src/hooks/query/useInfiniteScrollDataQuery';
import type { Movie } from '../query/contentQuery.types';
import { movieListFullPath, moduleName } from '../moduleInfo';
import Spinner from 'components/Spinner/Spinner';
import ContentCard from '../common/ContentCard';
import useInfiniteScrollHook from 'src/hooks/useInfiniteScrollHook';
import { popularMoviesApi } from 'src/utils/contentListApis';
import { Link } from 'react-router-dom';
function AllMovies() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteScrollDataQuery<Movie>({
    moduleName,
    apiBase: popularMoviesApi(),
  });

  useGSAP(
    () => {
      const hasResults = data?.pages.some((page) => page.results.length > 0);
      if (hasResults) {
        gsap.from('.movie-card', {
          y: 20,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set('.movie-card', { clearProps: 'all' });
          },
        });
      }
    },
    { dependencies: [data?.pages.length], scope: containerRef },
  );

  const handleScrollCallback = () => {
    if (isLoading || isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  };

  useInfiniteScrollHook({
    container: containerRef,
    callback: handleScrollCallback,
    offset: 200,
  });

  const allMovies = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div
      className='h-screen overflow-y-auto bg-(--bg-primary) pt-24 md:pt-36 pb-20 px-6 md:px-16 scroll-smooth'
      ref={containerRef}
    >
      <div>
        <div className='mb-12'>
          <h1 className='text-4xl md:text-5xl font-black tracking-tight text-white'>
            All <span className='text-(--color-primary)'>Movies</span>
          </h1>
          <p className='text-(--text-secondary) mt-2 text-lg'>
            Discover all the movies right now.
          </p>
        </div>

        {isLoading && !data && (
          <div className='flex flex-col items-center justify-center py-20 gap-4'>
            <Spinner />
            <p className='text-(--text-secondary) animate-pulse'>
              Loading the vault...
            </p>
          </div>
        )}

        {isError && (
          <div className='text-center py-20'>
            <p className='text-(--danger) text-lg font-semibold'>
              Something went wrong. Please try again.
            </p>
          </div>
        )}

        {allMovies.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 w-full auto-rows-fr'>
            {allMovies.map((movie, index) => (
              <div key={`${movie.id}-${index}`} className='movie-card'>
                <Link to={`${movieListFullPath}/${movie.id}`}>
                  <ContentCard content={movie} variant='movies-list' />
                </Link>
              </div>
            ))}
          </div>
        )}

        {isFetchingNextPage && (
          <div className='flex justify-center py-10 h-30'>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default AllMovies;
