import React from 'react';
import { Link } from 'react-router-dom';
import { Search, LogOut, User } from 'lucide-react';
import Button from 'src/components/Button/Button';
import Input from '../FormComponents/Input';
import { dashboardFullPath } from 'modules/Dashboard/moduleInfo';

interface NavLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface MobileNavProps {
  isOpen: boolean;
  navLinks: NavLink[];
  userData: any;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onLogout: () => void;
  onLoginClick: () => void;
  onClose: () => void;
  mobileMenuRef: React.RefObject<HTMLDivElement | null>;
}

const MobileNav = ({
  isOpen,
  navLinks,
  userData,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onLogout,
  onLoginClick,
  onClose,
  mobileMenuRef,
}: MobileNavProps) => {
  return (
    <div
      ref={mobileMenuRef}
      className='absolute top-0 left-0 w-full h-screen bg-(--bg-primary)/98 backdrop-blur-2xl md:hidden z-105 flex flex-col p-8 pt-24'
      style={{ visibility: isOpen ? 'visible' : 'hidden', opacity: 0 }}
    >
      {/* Mobile Search Bar */}
      <div className='mobile-link mb-8'>
        <form onSubmit={onSearchSubmit}>
          <Input
            type='text'
            placeholder='Search movies...'
            value={searchQuery}
            onChange={onSearchChange}
            prefix={<Search size={20} />}
            size='md'
            className='bg-white/5 border-white/10'
            fullWidth
          />
        </form>
      </div>

      {/* Navigation Section */}
      <div className='flex flex-col gap-6'>
        <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-(--text-secondary) mb-2'>
          Menu
        </p>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={onClose}
            className='mobile-link flex items-center gap-4 text-xl font-bold text-white hover:text-(--color-primary) transition-colors'
          >
            <span className='text-(--color-primary)'>{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className='mobile-link h-px w-full bg-white/10 my-8' />

      {/* User/Account Section */}
      <div className='mobile-link flex flex-col gap-6'>
        <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-(--text-secondary) mb-2'>
          Account
        </p>
        {userData ? (
          <div className='w-full flex flex-row items-center justify-between gap-4'>
            <Link to={dashboardFullPath} onClick={onClose}>
              <div className='flex items-center gap-4 hover:opacity-80 transition-opacity'>
                <div className='w-12 h-12 rounded-full bg-(--color-primary)/20 flex items-center justify-center text-(--color-primary) border border-(--color-primary)/20'>
                  <User size={24} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-lg font-bold text-white'>
                    {userData.displayName || 'User'}
                  </span>
                  <span className='text-sm text-(--text-secondary)'>
                    {userData.email}
                  </span>
                </div>
              </div>
            </Link>
            <button
              onClick={onLogout}
              className='flex items-center gap-3 text-lg font-semibold text-(--danger) hover:opacity-80 transition-opacity w-fit cursor-pointer'
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        ) : (
          <Button
            onClick={onLoginClick}
            fullWidth
            size='lg'
            className='cursor-pointer'
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
