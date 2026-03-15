import React from 'react';
import { Link } from 'react-router-dom';
import { Search, LogOut, User } from 'lucide-react';
import clsx from 'clsx';
import Button from 'src/components/Button/Button';
import Input from '../FormComponents/Input';
import { dashboardFullPath } from 'modules/Dashboard/moduleInfo';

interface NavLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface DesktopNavProps {
  navLinks: NavLink[];
  userData: any;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onLogout: () => void;
  onLoginClick: () => void;
  currentPath: string;
}

const DesktopNav = ({
  navLinks,
  userData,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onLogout,
  onLoginClick,
  currentPath,
}: DesktopNavProps) => {
  return (
    <div className='hidden md:flex items-center gap-8'>
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={clsx(
            'flex items-center gap-2 text-md font-semibold transition-colors hover:text-(--color-primary)',
            currentPath === link.path
              ? 'text-(--color-primary)'
              : 'text-(--text-primary)',
          )}
        >
          {link.icon}
          {link.name}
        </Link>
      ))}

      {/* Desktop Search Bar */}
      <form onSubmit={onSearchSubmit}>
        <Input
          type='text'
          placeholder='Search movies...'
          value={searchQuery}
          onChange={onSearchChange}
          prefix={<Search size={16} />}
          size='sm'
          className='bg-(--bg-secondary)/50 border-white/10 w-48 focus-within:w-64 
          transition-all duration-300'
        />
      </form>

      {userData ? (
        <div className='flex items-center gap-4 pl-4 border-l border-white/10'>
          <Link to={dashboardFullPath}>
            <div className='flex items-center gap-2 text-sm font-medium text-(--text-secondary)'>
              <div className='w-8 h-8 rounded-full bg-(--color-primary)/20 flex items-center justify-center text-(--color-primary)'>
                <User size={16} />
              </div>
              <span>{userData.displayName || 'User'}</span>
            </div>
          </Link>
          <button
            onClick={onLogout}
            className='p-2 text-(--text-secondary) hover:text-(--danger) transition-colors cursor-pointer'
            title='Logout'
          >
            <LogOut size={20} />
          </button>
        </div>
      ) : (
        <Button
          onClick={onLoginClick}
          size='sm'
          className='px-6 cursor-pointer'
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default DesktopNav;
