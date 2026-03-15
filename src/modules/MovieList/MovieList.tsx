import HeroSectionTrending from './components/HeroSectionTrending';
import ContentCarousel from './components/ContentCarousel';
import { usePopularMoviesQuery } from './query/usePopularMoviesQuery';
import { useTopRatedMoviesQuery } from './query/useTopRatedMoviesQuery';
import { useUpcomingMoviesQuery } from './query/useUpcomingMoviesQuery';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MovieList = () => {
  const { data: popularMovies, isLoading: moviesLoading } =
    usePopularMoviesQuery({});
  const { data: topRatedMovies, isLoading: topRatedLoading } =
    useTopRatedMoviesQuery({});
  const { data: upcomingMovies, isLoading: upcomingLoading } =
    useUpcomingMoviesQuery({});

  useGSAP(() => {
    // NOTE - Reveal animation for sections
    gsap.from('.section-fade', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.section-fade',
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <div className='min-h-screen bg-(--bg-primary) pb-20 flex flex-col gap-10 md:gap-20'>
      {/* Hero Section */}
      <HeroSectionTrending />

      {/* Main Content Sections */}
      <div className='relative z-10 flex flex-col gap-10 md:gap-16'>
        <div className='section-fade'>
          <ContentCarousel
            title='Upcoming Movies'
            data={upcomingMovies?.results || []}
            isLoading={upcomingLoading}
          />
        </div>

        <div className='section-fade'>
          <ContentCarousel
            title='Top Rated Movies'
            data={topRatedMovies?.results || []}
            isLoading={topRatedLoading}
          />
        </div>

        <div className='section-fade'>
          <ContentCarousel
            title='Popular Movies'
            data={popularMovies?.results || []}
            isLoading={moviesLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieList;
