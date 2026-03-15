import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useInfiniteScrollDataQuery } from 'src/hooks/query/useInfiniteScrollDataQuery';
import type { Movie } from '../query/contentQuery.types';
import { moduleName } from '../moduleInfo';
import Input from 'src/components/FormComponents/Input';
import Spinner from 'components/Spinner/Spinner';
import SearchCard from '../components/SearchCard';
import useInfiniteScrollHook from 'src/hooks/useInfiniteScrollHook';
import { searchMovieApi } from 'src/utils/contentListApis';
function MovieSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteScrollDataQuery<Movie>({
    moduleName,
    apiBase: searchMovieApi(),
    queryParams: {
      query: debouncedQuery,
    },
    enabled: !!debouncedQuery,
  });

  useEffect(() => {
    if (debouncedQuery !== searchParams.get('search')) {
      setSearchParams({ search: debouncedQuery }, { replace: true });
    }
  }, [debouncedQuery, setSearchParams, searchParams]);

  useGSAP(
    () => {
      // NOTE - detect if we have results to animate in the latest page
      const hasResults = data?.pages.some((page) => page.results.length > 0);
      if (hasResults) {
        gsap.from('.search-card', {
          y: 20,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            // NTOE - ensuring transform is cleared after animation to prevent staggered layout
            gsap.set('.search-card', { clearProps: 'transform' });
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

  const allResults = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div
      className='h-screen overflow-y-auto bg-(--bg-primary) pt-24 md:pt-36 pb-20 px-6 md:px-16 scroll-smooth'
      ref={containerRef}
    >
      {/* Search Header */}
      <div className='max-w-4xl mx-auto mb-12 space-y-6'>
        <h1 className='text-4xl md:text-5xl font-black tracking-tight text-white mb-8'>
          Search <span className='text-(--color-primary)'>CineVault</span>
        </h1>
        <div className='relative group'>
          <Input
            type='text'
            placeholder='Search movies by title...'
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            prefix={<Search size={28} className='text-white/40' />}
            size='md'
            className='py-4! pl-16! rounded-2xl! bg-white/5 border-white/10 text-xl placeholder:text-white/20 focus:ring-(--color-primary)/20 focus:bg-white/10'
            autoFocus
            fullWidth
          />
        </div>
      </div>

      {/* Results Section */}
      <div className='max-w-7xl mx-auto'>
        {isLoading && !data && (
          <div className='flex flex-col items-center justify-center py-20 gap-4'>
            <Spinner />
            <p className='text-(--text-secondary) animate-pulse'>
              Searching the vault...
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

        {!isLoading && debouncedQuery && allResults.length === 0 && (
          <div className='text-center py-20 space-y-4'>
            <div className='text-6xl'>🎬</div>
            <h2 className='text-2xl font-bold text-white'>No movies found</h2>
            <p className='text-(--text-secondary)'>
              We couldn't find anything matching "{debouncedQuery}"
            </p>
          </div>
        )}

        {allResults.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 w-full auto-rows-fr'>
            {allResults.map((movie, index) => (
              <SearchCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </div>
        )}

        {isFetchingNextPage && (
          <div className='flex justify-center py-10'>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;
