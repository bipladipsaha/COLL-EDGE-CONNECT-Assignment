import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiCheckCircle } from 'react-icons/fi';

const AuthLayout = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Left side - branding/info */}
      <div className="hidden md:flex md:w-1/2 bg-primary-600 dark:bg-primary-900 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold mb-12">
            <FiCheckCircle className="text-3xl" />
            <span>TaskFlow</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Manage your work,<br />with clarity.
          </h1>
          <p className="text-primary-100 text-lg max-w-md">
            Join thousands of professionals who organize their tasks, projects, and daily goals with TaskFlow.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1,2,3,4].map((i) => (
              <img key={i} className="w-10 h-10 rounded-full border-2 border-primary-600" src={`https://i.pravatar.cc/100?img=${i}`} alt="Avatar" />
            ))}
          </div>
          <p className="text-sm font-medium">Trusted by 10k+ users</p>
        </div>
      </div>
      
      {/* Right side - auth form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
