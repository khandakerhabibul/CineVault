import { useEffect, useRef } from 'react';

type UseInfiniteScrollHookProps = {
  container: React.MutableRefObject<HTMLDivElement | null>;
  callback: () => void;
  offset?: number;
};

export default function useInfiniteScrollHook({
  container,
  callback,
  offset = 0,
}: UseInfiniteScrollHookProps) {
  const callbackRef = useRef(callback);
  const lastScrollTop = useRef(0);
  const lastScrollLeft = useRef(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleScroll = () => {
    const el = container.current;
    if (!el) return;

    const currentScrollTop = el.scrollTop;
    const currentScrollLeft = el.scrollLeft;

    const scrolledVertically = currentScrollTop !== lastScrollTop.current;

    // NOTE - Store current scroll positions for next event
    lastScrollTop.current = currentScrollTop;
    lastScrollLeft.current = currentScrollLeft;

    // NOTE - Only run callback if scrolled vertically and is near bottom
    const isAtBottom =
      currentScrollTop + el.clientHeight >= el.scrollHeight - offset;

    if (scrolledVertically && isAtBottom) {
      callbackRef.current();
    }
  };

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    el.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [container, offset]);
}
