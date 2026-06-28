import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiPlus, FiSearch, FiFilter, FiCheckSquare } from 'react-icons/fi';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Loader from '../components/Loader';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination & Search & Filter
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      let queryParams = `?page=${page}&limit=12`;
      if (filter.status) queryParams += `&status=${filter.status}`;
      if (filter.priority) queryParams += `&priority=${filter.priority}`;
      
      const endpoint = search ? `/tasks/search?q=${search}&page=${page}&limit=12` : `/tasks${queryParams}`;
      const { data } = await api.get(endpoint);
      
      setTasks(data.data.tasks);
      setTotalPages(data.data.pagination.pages);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  }, [page, filter, search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTasks();
    }, 300); // 300ms debounce for search
    return () => clearTimeout(delayDebounceFn);
  }, [fetchTasks, search]);

  const handleCreateEditTask = async (data) => {
    setIsSubmitting(true);
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, data);
        toast.success('Task updated successfully');
      } else {
        await api.post('/tasks', data);
        toast.success('Task created successfully');
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success('Task deleted successfully');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
      toast.success('Status updated');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Tasks</h1>
          <p className="text-slate-500 dark:text-slate-400">View and manage all your tasks.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <FiPlus /> New Task
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm dark:text-white transition-colors"
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-slate-400" />
            <select 
              value={filter.status}
              onChange={(e) => { setFilter({...filter, status: e.target.value}); setPage(1); }}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <select 
            value={filter.priority}
            onChange={(e) => { setFilter({...filter, priority: e.target.value}); setPage(1); }}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Task Grid */}
      {isLoading ? (
        <div className="py-20"><Loader size="lg" /></div>
      ) : tasks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {tasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium disabled:opacity-50 dark:text-slate-300"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 px-4">
                Page {page} of {totalPages}
              </span>
              <button 
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium disabled:opacity-50 dark:text-slate-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed">
          <div className="mx-auto w-24 h-24 mb-4 text-slate-300 dark:text-slate-600">
             <FiCheckSquare size={96} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No tasks found</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            {search || filter.status || filter.priority 
              ? "We couldn't find any tasks matching your current filters. Try adjusting them." 
              : "You don't have any tasks yet. Create one to get started!"}
          </p>
          {!(search || filter.status || filter.priority) && (
            <button 
               onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              <FiPlus /> Create First Task
            </button>
          )}
        </div>
      )}

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateEditTask}
        task={editingTask}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Tasks;
