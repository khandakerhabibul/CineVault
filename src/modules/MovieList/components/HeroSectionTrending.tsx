import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTrendingMoviesQuery } from '../query/useTrendingMoviesQuery';
import { TMDB_IMAGE_BASE_URL } from 'src/common/constant';
import Button from 'src/components/Button/Button';
import { Play, Info, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Loader from 'src/components/Loader/Loader';
import { movieListFullPath } from '../moduleInfo';
import WatchlistButton from 'src/components/WatchlistButton/WatchlistButton';

const HeroSectionTrending = () => {
  const { data, isLoading } = useTrendingMoviesQuery();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const trendingMovies = data?.results.slice(0, 5) || [];

  const slideNext = () => {
    setActiveIndex((prev) => (prev + 1) % trendingMovies.length);
  };

  const slidePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + trendingMovies.length) % trendingMovies.length,
    );
  };

  // NOTE - Auto-switch logic, changing slide every 10 seconds
  useEffect(() => {
    if (!trendingMovies.length) return;

    const interval = setInterval(() => {
      slideNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [trendingMovies.length, activeIndex]);

  useGSAP(
    () => {
      if (!trendingMovies.length) return;

      const items = gsap.utils.toArray<HTMLElement>('.hero-item');

      // NOTE - Inactive slides. move out and hide
      items.forEach((item, index) => {
        if (index !== activeIndex) {
          gsap.to(item, {
            autoAlpha: 0,
            x: index < activeIndex ? -100 : 100,
            duration: 0.8,
            ease: 'power3.inOut',
            zIndex: 1,
          });
        }
      });

      // NOTE - Active slide. move in and show
      const activeItem = items[activeIndex];
      gsap.to(activeItem, {
        autoAlpha: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        zIndex: 10,
      });

      // NOTE - Active slide content animation
      gsap.fromTo(
        `.hero-item:nth-child(${activeIndex + 1}) .hero-content > *`,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.4,
        },
      );
    },
    { scope: containerRef, dependencies: [activeIndex, trendingMovies.length] },
  );

  if (isLoading)
    return (
      <div className='h-dvh flex items-center justify-center bg-(--bg-primary)'>
        <Loader />
      </div>
    );

  return (
    <div
      ref={containerRef}
      className='relative h-dvh w-full overflow-hidden bg-(--bg-primary)'
    >
      <div className='relative h-full w-full'>
        {trendingMovies.map((movie, index) => (
          <div
            key={movie.id}
            className='hero-item absolute inset-0 w-full h-full pointer-events-none'
            style={{
              visibility: index === 0 ? 'visible' : 'hidden',
              opacity: index === 0 ? 1 : 0,
              zIndex: index === 0 ? 10 : 1,
            }}
          >
            {/* Background Image with Overlay */}
            <div className='absolute inset-0 z-0'>
              <img
                src={`${TMDB_IMAGE_BASE_URL.replace('/w500', '/original')}${movie.backdrop_path}`}
                alt={movie.title}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-linear-to-r from-(--bg-primary) via-(--bg-primary)/40 to-transparent' />
              <div className='absolute inset-0 bg-linear-to-t from-(--bg-primary) via-transparent to-transparent' />
            </div>

            {/* Content */}
            <div className='hero-content relative z-20 h-full flex flex-col justify-center px-6 md:px-16 max-w-3xl pointer-events-auto'>
              <span
                className='inline-block px-3 py-1 rounded-full bg-(--color-primary)/20 border border-(--color-primary)/30 text-(--color-secondary)
                text-xs font-bold uppercase tracking-widest mb-4 max-w-fit'
              >
                Trending Now
              </span>
              <h1 className='text-4xl md:text-7xl font-black text-white mb-4 leading-tight'>
                {movie.title}
              </h1>
              <div className='flex items-center gap-4 mb-6 text-sm font-medium text-(--text-secondary)'>
                <span className='flex items-center gap-1 text-yellow-500'>
                  <Star fill='currentColor' size={16} />
                  {movie.vote_average.toFixed(1)}
                </span>
                <span>{movie.release_date?.split('-')[0]}</span>
                <span className='px-2 py-0.5 rounded border border-(--border-color)'>
                  HD
                </span>
              </div>
              <p className='text-base md:text-lg text-(--text-secondary) mb-8 line-clamp-3 md:line-clamp-4'>
                {movie.overview}
              </p>
              <div className='flex flex-col md:flex-row items-start md:items-center gap-4'>
                <Button
                  size='md'
                  className='group cursor-pointer'
                  onClick={() => console.log('Watch Trailer:', movie.title)}
                >
                  <Play fill='currentColor' size={20} />
                  <span>Play Trailer</span>
                </Button>
                <Button
                  variant='secondary'
                  size='md'
                  className='cursor-pointer'
                  onClick={() => navigate(`${movieListFullPath}/${movie.id}`)}
                >
                  <Info size={20} />
                  <span>More Info</span>
                </Button>
                <WatchlistButton movieId={movie.id} variant='hero' size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className='absolute bottom-10 right-10 hidden md:flex gap-4 z-50'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            slidePrev();
          }}
          className='p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-(--color-primary) hover:border-(--color-primary) transition-all duration-300 backdrop-blur-sm cursor-pointer'
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            slideNext();
          }}
          className='p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-(--color-primary) hover:border-(--color-primary) transition-all duration-300 backdrop-blur-sm cursor-pointer'
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className='absolute bottom-10 left-6 md:left-16 flex gap-3 z-50'>
        {trendingMovies.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
              i === activeIndex
                ? 'w-10 bg-(--color-primary)'
                : 'w-6 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSectionTrending;
