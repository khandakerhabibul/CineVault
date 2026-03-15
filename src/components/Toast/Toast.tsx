import { useRef } from 'react';
import {
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info as InfoIcon,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import clsx from 'clsx';
import { type ToastType } from '../../context/ToastContext';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
}

const variantStyles = {
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    icon: <CheckCircle className='text-green-500' size={20} />,
    glow: 'shadow-[0_0_20px_rgba(34,197,94,0.1)]',
    progress: 'bg-green-500',
  },
  danger: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    icon: <XCircle className='text-red-500' size={20} />,
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.1)]',
    progress: 'bg-red-500',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    icon: <AlertTriangle className='text-yellow-500' size={20} />,
    glow: 'shadow-[0_0_20px_rgba(234,179,8,0.1)]',
    progress: 'bg-yellow-500',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: <InfoIcon className='text-blue-500' size={20} />,
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.1)]',
    progress: 'bg-blue-500',
  },
};

const Toast = ({ id, message, type, onClose }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const styles = variantStyles[type];

  useGSAP(
    () => {
      // NOTE - entry animation
      gsap.fromTo(
        toastRef.current,
        { x: 100, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      );

      // NOTE - progress bar animation
      gsap.to(progressRef.current, {
        width: '0%',
        duration: 5,
        ease: 'none',
      });
    },
    { scope: toastRef },
  );

  const handleClose = () => {
    gsap.to(toastRef.current, {
      x: 100,
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => onClose(id),
    });
  };

  return (
    <div
      ref={toastRef}
      className={clsx(
        'relative group min-w-[300px] max-w-md p-4 rounded-xl backdrop-blur-md border flex items-center gap-4 transition-all duration-300 pointer-events-auto overflow-hidden',
        styles.bg,
        styles.border,
        styles.glow,
      )}
    >
      <div className='shrink-0 mt-0.5'>{styles.icon}</div>
      <div className='flex-1'>
        <p className='text-sm font-medium text-white leading-tight'>
          {message}
        </p>
      </div>
      <button
        onClick={handleClose}
        className='shrink-0 p-1 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer'
      >
        <X size={16} />
      </button>

      {/* NOTE - progress bar */}
      <div className='absolute bottom-0 left-0 h-0.5 w-full bg-white/5'>
        <div
          ref={progressRef}
          className={clsx('h-full w-full', styles.progress)}
        />
      </div>
    </div>
  );
};

export default Toast;
