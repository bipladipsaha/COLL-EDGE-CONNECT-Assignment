import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

const Register = () => {
  const { register: registerForm, handleSubmit, formState: { errors } } = useForm();
  const { register } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    await register(data.name, data.email, data.password);
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Create an account</h2>
        <p className="text-slate-500 dark:text-slate-400">Start organizing your work today.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-slate-400" />
            </div>
            <input
              type="text"
              {...registerForm("name", { required: "Name is required" })}
              className={`block w-full pl-10 px-4 py-2.5 bg-white dark:bg-slate-800 border ${errors.name ? 'border-red-500 ring-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all dark:text-white`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-slate-400" />
            </div>
            <input
              type="email"
              {...registerForm("email", { required: "Email is required" })}
              className={`block w-full pl-10 px-4 py-2.5 bg-white dark:bg-slate-800 border ${errors.email ? 'border-red-500 ring-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all dark:text-white`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-slate-400" />
            </div>
            <input
              type="password"
              {...registerForm("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
              className={`block w-full pl-10 px-4 py-2.5 bg-white dark:bg-slate-800 border ${errors.password ? 'border-red-500 ring-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all dark:text-white`}
              placeholder="Create a password"
            />
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 transition-colors"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
