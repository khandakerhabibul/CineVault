import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from 'src/context/AuthProvider';
import { Menu, X, Heart, Film } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Logo from 'src/components/Logo/Logo';
import { watchlistFullPath } from 'modules/Watchlist/moduleInfo';
import {
  allMoviesListPathFull,
  movieSearchPathFull,
} from 'modules/MovieList/moduleInfo';

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar = () => {
  const { userData, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const lastScrollY = useRef(0);
  const scrollThreshold = 10;

  const toggleMenu = () => setIsOpen(!isOpen);

  // NOTE - Scroll visibility logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isOpen) return;

      if (Math.abs(currentScrollY - lastScrollY.current) < scrollThreshold)
        return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // NOTE - Scrolling down - hide
        setIsVisible(false);
      } else {
        // NOTE - Scrolling up - show
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useGSAP(
    () => {
      // NOTE - Navbar visibility animation
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        duration: 0.4,
        ease: 'power3.out',
      });
    },
    { dependencies: [isVisible] },
  );

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        });
        gsap.fromTo(
          '.mobile-link',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.1 },
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          autoAlpha: 0,
          y: -20,
          duration: 0.3,
          ease: 'power3.in',
        });
      }
    },
    { scope: navRef, dependencies: [isOpen] },
  );

  const navLinks = userData
    ? [
        {
          name: 'All Movies',
          path: allMoviesListPathFull,
          icon: <Film size={18} />,
        },
        {
          name: 'Watchlist',
          path: watchlistFullPath,
          icon: <Heart size={18} />,
        },
      ]
    : [];

  const handleLogoutClick = async () => {
    await handleLogout();
    setIsOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `${movieSearchPathFull}?search=${encodeURIComponent(searchQuery.trim())}`,
      );
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className='fixed top-0 left-0 right-0 z-100 transition-all duration-300 bg-linear-to-b from-(--bg-primary)/80 to-transparent backdrop-blur-sm'
    >
      <div className='px-6 md:px-16 h-20 flex items-center justify-between gap-4'>
        <Logo />

        <DesktopNav
          navLinks={navLinks}
          userData={userData}
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearch}
          onLogout={handleLogoutClick}
          onLoginClick={() => navigate('/login')}
          currentPath={location.pathname}
        />

        {/* Mobile Hamburger Header */}
        <button
          onClick={toggleMenu}
          className='min-[1020px]:hidden p-2 text-white hover:text-(--color-primary) transition-colors z-110 cursor-pointer'
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <MobileNav
        isOpen={isOpen}
        navLinks={navLinks}
        userData={userData}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearch}
        onLogout={handleLogoutClick}
        onLoginClick={() => {
          navigate('/login');
          setIsOpen(false);
        }}
        onClose={() => setIsOpen(false)}
        mobileMenuRef={mobileMenuRef}
      />
    </nav>
  );
};

export default Navbar;
