import { FiLoader } from 'react-icons/fi';

const Loader = ({ size = 'md' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className="flex justify-center items-center">
      <FiLoader className={`animate-spin text-primary-600 dark:text-primary-400 ${sizes[size]}`} />
    </div>
  );
};

export default Loader;
