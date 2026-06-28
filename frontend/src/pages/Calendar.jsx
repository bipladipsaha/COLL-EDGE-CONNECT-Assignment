import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Loader from '../components/Loader';

const Calendar = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await api.get('/tasks');
        setTasks(data.data.tasks);
      } catch (error) {
        toast.error('Failed to load tasks');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Create an array of days to render (including empty slots for offset)
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // Empty slots
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Helper to get tasks for a specific date
  const getTasksForDate = (day) => {
    if (!day) return [];
    
    // Normalize target date to midnight for comparison
    const targetDate = new Date(year, month, day);
    targetDate.setHours(0, 0, 0, 0);

    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === targetDate.getTime();
    });
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Calendar</h1>
          <p className="text-slate-500 dark:text-slate-400">View your tasks mapped by due dates.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors text-slate-500 dark:text-slate-400">
            <FiChevronLeft size={20} />
          </button>
          <span className="font-semibold text-slate-800 dark:text-white w-32 text-center">
            {monthNames[month]} {year}
          </span>
          <button onClick={handleNextMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors text-slate-500 dark:text-slate-400">
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20"><Loader size="lg" /></div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            {dayNames.map(day => (
              <div key={day} className="py-3 text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 auto-rows-fr">
            {days.map((day, index) => {
              const dayTasks = getTasksForDate(day);
              return (
                <div 
                  key={index} 
                  className={`min-h-[120px] p-2 border-r border-b border-slate-100 dark:border-slate-700/50 ${
                    !day ? 'bg-slate-50 dark:bg-slate-900/20' : 'bg-white dark:bg-slate-800'
                  } transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30`}
                >
                  {day && (
                    <>
                      <div className="flex justify-between items-start mb-1">
                        <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium ${
                          isToday(day) 
                            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' 
                            : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {day}
                        </span>
                        {dayTasks.length > 0 && (
                          <span className="text-xs font-semibold text-primary-600 bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 px-2 py-0.5 rounded-full">
                            {dayTasks.length} task{dayTasks.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 mt-2">
                        {dayTasks.slice(0, 3).map(task => (
                          <div 
                            key={task._id} 
                            className={`truncate text-xs px-2 py-1 rounded-md border ${
                              task.status === 'Completed' 
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400' 
                                : task.priority === 'Critical' || task.priority === 'High'
                                  ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                                  : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300'
                            }`}
                            title={task.title}
                          >
                            {task.title}
                          </div>
                        ))}
                        {dayTasks.length > 3 && (
                          <div className="text-xs text-slate-500 dark:text-slate-400 text-center font-medium mt-1">
                            +{dayTasks.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
