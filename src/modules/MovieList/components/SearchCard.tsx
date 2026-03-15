import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Movie } from '../query/contentQuery.types';
import { TMDB_IMAGE_BASE_URL } from 'src/common/constant';
import Button from 'src/components/Button/Button';
import { movieListFullPath } from '../moduleInfo';
import WatchlistButton from 'src/components/WatchlistButton/WatchlistButton';

type Props = {
  movie: Movie;
};

function SearchCard({ movie }: Props) {
  return (
    <div
      key={movie.id}
      className='search-card group bg-white/5 border border-white/5 rounded-xl overflow-hidden hover:border-(--color-primary)/50 transition-all duration-300 flex flex-col h-full'
    >
      <Link
        to={`${movieListFullPath}/${movie.id}`}
        className='block relative aspect-2/3 overflow-hidden bg-white/5'
      >
        <img
          src={
            movie.poster_path
              ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={movie.title}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
          <div className='flex gap-2'>
            <Button size='sm' className='flex-1 py-1 text-xs'>
              Details
            </Button>
            <WatchlistButton
              movieId={movie.id}
              variant='icon'
              className='p-1.5'
            />
          </div>
        </div>
      </Link>
      <div className='p-3 flex flex-col flex-1 justify-between gap-2'>
        <h3 className='font-bold text-sm text-white line-clamp-2 group-hover:text-(--color-primary) transition-colors leading-tight'>
          {movie.title}
        </h3>
        <div className='flex items-center justify-between text-xs text-(--text-secondary) mt-auto pt-2 border-t border-white/5'>
          <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
          <div className='flex items-center gap-1 text-yellow-500 font-bold'>
            <Star size={12} fill='currentColor' />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
