import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { type Movie } from '../query/contentQuery.types';
import ContentCard from '../common/ContentCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentCarouselProps {
  title: string;
  data: Movie[];
  isLoading?: boolean;
}

const ContentCarousel = ({ title, data, isLoading }: ContentCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayData = data?.length > 0 ? data : [];

  useGSAP(
    () => {
      if (!data?.length || !scrollRef.current) return;

      // NOTE - Initial position, skip the first set of clones
      const container = scrollRef.current;
      const initialOffset = (container.scrollWidth / displayData.length) * 5;
      gsap.set(container, { scrollLeft: initialOffset });

      // NOTE - Entrance animation
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef, dependencies: [data] },
  );

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current || !data?.length) return;

    const container = scrollRef.current;
    const scrollAmount = window.innerWidth * 0.8;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    const targetScroll =
      direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    gsap.to(container, {
      scrollLeft: targetScroll,
      duration: 1,
      ease: 'power3.inOut',
      onComplete: () => {
        const updatedScroll = container.scrollLeft;
        const singleSetWidth =
          (container.scrollWidth / displayData.length) * data.length;
        const cloneWidth = (container.scrollWidth / displayData.length) * 5;

        if (updatedScroll >= maxScroll - 10) {
          gsap.set(container, {
            scrollLeft: cloneWidth + (updatedScroll - maxScroll),
          });
        } else if (updatedScroll <= 10) {
          gsap.set(container, { scrollLeft: singleSetWidth + updatedScroll });
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className='py-10 px-6 md:px-16 space-y-4'>
        <div className='h-8 w-48 bg-white/10 rounded animate-pulse' />
        <div className='flex gap-4 overflow-hidden'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className='min-w-[200px] h-[300px] bg-white/5 rounded-xl animate-pulse'
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className='px-6 md:px-16 group/carousel'>
      <div className='flex items-end justify-between mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold border-l-4 border-(--color-primary) pl-4'>
          {title}
        </h2>

        <div className='flex gap-2 opacity-0 group-hover/carousel:opacity-100 transition-[opacity,transform] duration-300 transform translate-x-2 group-hover/carousel:translate-x-0'>
          <button
            onClick={() => scroll('left')}
            className='p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-(--color-primary) hover:scale-110 active:scale-95 transition-[background-color,transform] cursor-pointer'
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className='p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-(--color-primary) hover:scale-110 active:scale-95 transition-[background-color,transform] cursor-pointer'
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className='flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-10 pt-10 -mt-10'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayData?.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className='min-w-[160px] md:min-w-[220px] py-4'
          >
            <ContentCard content={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCarousel;
