import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const Landing = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold text-primary-600 dark:text-primary-400">
          <FiCheckCircle className="text-3xl" />
          <span>TaskFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-medium">Log in</Link>
          <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm">Sign up</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="container mx-auto px-6 pt-20 pb-24 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary-600"></span>
          TaskFlow v2.0 is now live
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mb-6">
          The smart way to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">manage tasks</span> and get work done.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10">
          TaskFlow provides a modern, fast, and beautiful interface to help you organize your life and boost productivity. Built for individuals and teams who care about design.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/register" className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3.5 rounded-xl font-medium text-lg transition-all shadow-lg hover:shadow-primary-500/30">
            Start for free <FiArrowRight />
          </Link>
          <Link to="/login" className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-3.5 rounded-xl font-medium text-lg transition-colors shadow-sm">
            Live Demo
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 w-full max-w-5xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden p-2">
          <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-t-xl border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2">
             <div className="w-3 h-3 rounded-full bg-red-400"></div>
             <div className="w-3 h-3 rounded-full bg-amber-400"></div>
             <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="w-full aspect-[16/9] bg-slate-50 dark:bg-slate-950 rounded-b-xl flex items-center justify-center text-slate-400 border border-t-0 border-slate-200 dark:border-slate-800">
             [Dashboard Screenshot Placeholder]
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
