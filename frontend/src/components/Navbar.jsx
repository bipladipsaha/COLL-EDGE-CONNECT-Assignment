import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FiMenu, FiMoon, FiSun, FiBell, FiUser } from 'react-icons/fi';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/50 shadow-sm z-10 transition-colors duration-200">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <FiMenu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 focus:outline-none rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        
        <button className="p-2 text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 focus:outline-none rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative">
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800"></span>
        </button>

        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-200 dark:border-slate-700">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{user?.email}</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold border border-primary-200 dark:border-primary-800">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
