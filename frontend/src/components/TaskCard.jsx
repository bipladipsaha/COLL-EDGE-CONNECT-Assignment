import { FiClock, FiCheckCircle, FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  const priorityColors = {
    Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    High: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const statusColors = {
    Pending: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600',
    'In Progress': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    Cancelled: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group relative">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 rounded-full">
            {task.category}
          </span>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            onBlur={() => setTimeout(() => setShowMenu(false), 200)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <FiMoreVertical />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-700 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 py-1 z-10">
              <button onClick={() => onEdit(task)} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-2">
                <FiEdit2 size={14} /> Edit
              </button>
              <button onClick={() => onDelete(task._id)} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-600 flex items-center gap-2">
                <FiTrash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className={`text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 ${task.status === 'Completed' ? 'line-through opacity-70' : ''}`}>
        {task.title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 line-clamp-2 min-h-[40px]">
        {task.description || "No description provided."}
      </p>

      <div className="flex items-center justify-between mt-auto border-t border-slate-100 dark:border-slate-700 pt-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <FiClock />
          <span className={new Date(task.dueDate) < new Date() && task.status !== 'Completed' ? 'text-red-500' : ''}>
            {formatDate(task.dueDate)}
          </span>
        </div>
        
        <select 
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className={`text-xs font-semibold px-3 py-1 rounded-full border outline-none appearance-none cursor-pointer text-center ${statusColors[task.status]}`}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
