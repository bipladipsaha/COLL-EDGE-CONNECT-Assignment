import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiList, FiCheckCircle, FiClock, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import StatisticsCard from '../components/StatisticsCard';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, highPriority: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const { data } = await api.get('/tasks');
        const allTasks = data.data.tasks;
        
        setStats({
          total: allTasks.length,
          completed: allTasks.filter(t => t.status === 'Completed').length,
          pending: allTasks.filter(t => t.status === 'Pending' || t.status === 'In Progress').length,
          highPriority: allTasks.filter(t => t.priority === 'High' || t.priority === 'Critical').length,
        });

        // Show top 3 pending or high priority tasks as "Recent/Urgent"
        const urgentTasks = allTasks
          .filter(t => t.status !== 'Completed')
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .slice(0, 3);
          
        setTasks(urgentTasks);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">Here's a quick summary of your tasks.</p>
      </div>

      {isLoading ? (
        <div className="py-20"><Loader size="lg" /></div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatisticsCard title="Total Tasks" value={stats.total} icon={<FiList size={24} />} colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
            <StatisticsCard title="Completed" value={stats.completed} icon={<FiCheckCircle size={24} />} colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
            <StatisticsCard title="Pending" value={stats.pending} icon={<FiClock size={24} />} colorClass="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" />
            <StatisticsCard title="High Priority" value={stats.highPriority} icon={<FiAlertCircle size={24} />} colorClass="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" />
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Urgent Tasks</h2>
            <Link to="/tasks" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 text-sm font-medium">
              View all tasks <FiArrowRight />
            </Link>
          </div>

          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {tasks.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  // No edit/delete on dashboard to keep it simple, they can click "view all tasks"
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onStatusChange={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-500 dark:text-slate-400">You don't have any urgent pending tasks! 🎉</p>
              <Link to="/tasks" className="mt-4 inline-block text-primary-600 font-medium hover:underline">
                Go to My Tasks
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
