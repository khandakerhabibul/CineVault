import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetailQuery } from '../query/useMovieDetailQuery';
import { useMovieCreditsQuery } from '../query/useMovieCreditsQuery';
import { TMDB_IMAGE_BASE_URL } from 'src/common/constant';
import { Star, Clock, Calendar, ChevronLeft, Play, Users } from 'lucide-react';
import Button from 'src/components/Button/Button';
import Spinner from 'src/components/Spinner/Spinner';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import WatchlistButton from 'src/components/WatchlistButton/WatchlistButton';

const MovieView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const movieNumId = id ? parseInt(id) : 0;

  const { data: movie, isLoading: isMovieLoading } = useMovieDetailQuery({
    id: id || '',
  });
  const { data: credits, isLoading: isCreditsLoading } = useMovieCreditsQuery({
    id: id || '',
  });

  useGSAP(() => {
    if (!isMovieLoading && movie) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.movie-backdrop', {
        opacity: 0,
        duration: 2,
      })
        .from(
          '.movie-poster-card',
          {
            x: -50,
            opacity: 0,
            duration: 1,
          },
          '-=1.5',
        )
        .from(
          '.movie-content-info > *',
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          '-=1.2',
        )
        .from(
          '.cast-section',
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          '-=0.5',
        );
    }
  }, [isMovieLoading, movie]);

  if (isMovieLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
        <h2 className='text-2xl font-bold'>Movie not found</h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const rating = movie.vote_average.toFixed(1);

  return (
    <div
      ref={containerRef}
      className='relative min-h-screen bg-(--bg-primary) text-white pb-20 overflow-hidden pt-4 md:pt-10 px-1 md:px-10'
    >
      {/* Dynamic Backdrop */}
      <div className='absolute top-0 left-0 w-full h-[70vh] z-0 overflow-hidden'>
        <div
          className='movie-backdrop absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 group-hover:scale-100'
          style={{
            backgroundImage: `url(${TMDB_IMAGE_BASE_URL}${movie.backdrop_path})`,
          }}
        />
        <div className='absolute inset-0 bg-linear-to-b from-(--bg-primary)/40 via-(--bg-primary)/80 to-(--bg-primary)' />
      </div>

      <div className='container relative z-10 pt-24 px-4 md:px-8'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 mb-8 text-(--text-secondary) hover:text-white transition-colors group cursor-pointer'
        >
          <ChevronLeft className='group-hover:-translate-x-1 transition-transform' />
          <span className='font-medium'>Back</span>
        </button>

        <div className='grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12 mb-10 md:mb-20'>
          {/* Poster Section */}
          <div className='movie-poster-card space-y-6'>
            <div className='aspect-2/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10'>
              <img
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className='w-full h-full object-cover'
              />
            </div>

            <div className='flex flex-col gap-3'>
              <Button
                variant='primary'
                fullWidth
                className='h-14 text-lg font-bold shadow-(--glow-primary)'
              >
                <Play fill='currentColor' />
                <span>Watch Trailer</span>
              </Button>

              <WatchlistButton
                movieId={movieNumId}
                variant='text'
                fullWidth
                size={22}
              />
            </div>
          </div>

          {/* Details Section */}
          <div className='movie-content-info space-y-8 h-full'>
            <div className='space-y-4'>
              <div className='flex flex-wrap items-center gap-3'>
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className='px-3 py-1 rounded-full bg-white/10 text-xs font-semibold border border-white/10'
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className='text-5xl md:text-7xl font-black tracking-tighter leading-none'>
                {movie.title}
              </h1>

              <p className='text-xl italic text-(--color-secondary) font-medium opacity-90'>
                {movie.tagline}
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-8 py-4 border-y border-white/10'>
              <div className='flex items-center gap-2'>
                <div className='p-2 rounded-lg bg-yellow-400/10 text-yellow-400'>
                  <Star fill='currentColor' size={20} />
                </div>
                <div>
                  <div className='text-lg font-bold'>{rating}</div>
                  <div className='text-xs text-(--text-secondary) uppercase tracking-wider font-bold'>
                    Rating
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <div className='p-2 rounded-lg bg-blue-400/10 text-blue-400'>
                  <Clock size={20} />
                </div>
                <div>
                  <div className='text-lg font-bold'>
                    {hours}h {minutes}m
                  </div>
                  <div className='text-xs text-(--text-secondary) uppercase tracking-wider font-bold'>
                    Duration
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <div className='p-2 rounded-lg bg-green-400/10 text-green-400'>
                  <Calendar size={20} />
                </div>
                <div>
                  <div className='text-lg font-bold'>{year}</div>
                  <div className='text-xs text-(--text-secondary) uppercase tracking-wider font-bold'>
                    Release
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-2xl font-bold flex items-center gap-2'>
                Storyline
              </h3>
              <p className='text-lg text-(--text-secondary) leading-relaxed max-w-3xl'>
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
        {/* Cast Section */}
        {!isCreditsLoading && credits && credits?.cast?.length > 0 && (
          <div className='cast-section space-y-6 pt-8'>
            <h3 className='text-2xl font-bold flex items-center gap-2'>
              <Users className='text-(--color-primary)' />
              Top Cast
            </h3>

            <div className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'>
              {credits.cast.slice(0, 10).map((member) => (
                <div
                  key={member.id}
                  className='flex-none w-32 group cursor-pointer'
                >
                  <div className='aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-(--color-primary) transition-all duration-300 shadow-xl'>
                    <img
                      src={
                        member.profile_path
                          ? `${TMDB_IMAGE_BASE_URL}${member.profile_path}`
                          : 'https://via.placeholder.com/150x150?text=No+Photo'
                      }
                      alt={member.name}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                  </div>
                  <div className='text-center'>
                    <div className='text-sm font-bold truncate text-white'>
                      {member.name}
                    </div>
                    <div className='text-[10px] text-(--text-secondary) truncate uppercase font-bold tracking-wider'>
                      {member.character}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieView;
