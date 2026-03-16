import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface VideoPlayerProps {
  videoKey: string | null;
  onClose: () => void;
  isOpen: boolean;
}

const VideoPlayer = ({ videoKey, onClose, isOpen }: VideoPlayerProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isOpen) {
        // NOTE - blocking body scroll
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline();
        tl.to(backdropRef.current, {
          autoAlpha: 1,
          duration: 0.4,
          ease: 'power2.out',
        }).fromTo(
          contentRef.current,
          { scale: 0.8, autoAlpha: 0, y: 20 },
          {
            scale: 1,
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.2',
        );
      } else {
        // NOTE - restoring body scroll
        document.body.style.overflow = '';

        gsap.to(modalRef.current, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    },
    { dependencies: [isOpen] },
  );

  // NOTE - handling ESC key to close for accessibility
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className='fixed inset-0 z-200 flex items-center justify-center p-4 md:p-8'
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className='absolute inset-0 bg-(--bg-primary)/90 backdrop-blur-xl cursor-pointer opacity-0'
        onClick={onClose}
      />

      {/* Content Container */}
      <div
        ref={contentRef}
        className='relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 opacity-0'
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-(--color-primary) hover:scale-110 transition-all duration-300 cursor-pointer backdrop-blur-md border border-white/10'
        >
          <X size={24} />
        </button>

        {/* Video Frame */}
        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
            title='YouTube video player'
            className='w-full h-full'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        ) : (
          <div className='w-full h-full flex flex-col items-center justify-center gap-4 text-(--text-secondary)'>
            <div className='text-xl font-bold'>Trailer not available</div>
            <p className='text-sm opacity-60 text-center px-8'>
              We couldn't find a trailer for this movie at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
