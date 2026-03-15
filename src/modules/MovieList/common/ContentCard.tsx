import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Info, Play } from 'lucide-react';
import { type Movie } from '../query/contentQuery.types';
import Button from 'src/components/Button/Button';
import clsx from 'clsx';
import { TMDB_IMAGE_BASE_URL } from 'src/common/constant';
import { movieListFullPath } from '../moduleInfo';
import WatchlistButton from 'src/components/WatchlistButton/WatchlistButton';

interface ContentCardProps {
  content: Movie;
  variant?: 'movies-list' | 'landing-page';
}

const ContentCard = ({
  content,
  variant = 'landing-page',
}: ContentCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const title = content.title;
  const releaseDate = content.release_date;
  const year = releaseDate ? releaseDate.split('-')[0] : '';
  const imageUrl = content.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${content.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div
      className='relative group w-full aspect-2/3 overflow-hidden rounded-xl bg-(--bg-secondary) 
      border border-(--border-color) transition-all duration-500 ease-out hover:scale-110 
      hover:z-20 hover:shadow-(--card-shadow) will-change-transform'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      <img
        src={imageUrl}
        alt={title}
        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
      />

      {/* Overlay */}
      <div
        className={clsx(
          'absolute inset-0 bg-linear-to-t from-[#0b1120] via-[#0b1120]/60 to-transparent transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Content Info (Hidden by default, shown on hover) */}
      <div
        className={clsx(
          'absolute inset-0 p-2.5 flex flex-col justify-end transition-all duration-500 transform ease-out',
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        )}
      >
        <div className='grow-0 space-y-2'>
          <div className='flex items-center gap-2'>
            <span className='px-1.5 py-0.5 rounded bg-(--color-primary) text-[10px] font-bold uppercase tracking-wider shrink-0'>
              Movie
            </span>
            <div className='flex items-center gap-1 text-yellow-400'>
              <Star size={12} fill='currentColor' />
              <span className='text-[12px] font-bold'>
                {content.vote_average.toFixed(1)}
              </span>
            </div>
            <span className='text-[12px] text-(--text-secondary) font-medium'>
              {year}
            </span>
          </div>

          <h3 className='text-xl font-bold line-clamp-2 leading-tight text-white mb-2'>
            {title}
          </h3>

          <p className='text-sm text-(--text-secondary) line-clamp-3 leading-tight mb-2'>
            {content.overview}
          </p>

          <div
            className={clsx(
              'flex items-center gap-2',
              variant === 'movies-list' ? 'pt-2 pb-1 mb-2' : 'py-1 mb-2',
            )}
          >
            <Button
              variant='primary'
              size='sm'
              className={clsx(
                'flex-1 text-lg font-bold flex items-center justify-center gap-1',
                variant === 'movies-list' ? 'h-8' : 'h-10',
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`${movieListFullPath}/${content.id}`);
              }}
            >
              <Play
                size={variant === 'movies-list' ? 10 : 14}
                fill='currentColor'
              />
              <span>Watch</span>
            </Button>

            <div className='flex flex-row gap-2 items-center'>
              <WatchlistButton
                movieId={content.id}
                variant='icon'
                className={variant === 'movies-list' ? 'w-8 h-8' : 'w-10 h-10'}
              />

              {variant === 'landing-page' && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`${movieListFullPath}/${content.id}`);
                  }}
                  className='w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-white/10 border hover:bg-white/20 border-white/20 text-white transition-all duration-300 cursor-pointer'
                >
                  <Info size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'absolute bottom-0 left-0 right-0 h-1 bg-(--color-primary) transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
};

export default ContentCard;
