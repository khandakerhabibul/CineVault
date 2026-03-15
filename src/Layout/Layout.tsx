import { movieListFullPath } from 'modules/MovieList/moduleInfo';
import { createContext, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from 'src/components/Navbar/Navbar';

const LayoutContext = createContext<{}>({});

function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/' || pathname === '/CineVault')
      navigate(movieListFullPath);
  }, [pathname]);

  const layoutRef = useRef<HTMLDivElement>(null);

  return (
    <LayoutContext.Provider value={{}}>
      <div ref={layoutRef} className='font-body'>
        <Navbar />
        <Outlet />
      </div>
    </LayoutContext.Provider>
  );
}

export default Layout;
