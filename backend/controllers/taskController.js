const Task = require('../models/Task');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, category, sort, page = 1, limit = 10 } = req.query;
    
    let query = { user: req.user._id };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;
    
    let sortQuery = { createdAt: -1 }; // default newest first
    if (sort === 'oldest') sortQuery = { createdAt: 1 };
    if (sort === 'priority') sortQuery = { priority: -1 }; // might need custom weight mapping, using string sort for now
    if (sort === 'alphabetical') sortQuery = { title: 1 };
    if (sort === 'dueDate') sortQuery = { dueDate: 1 };
    if (sort === 'completionDate') sortQuery = { completedAt: -1 };

    const startIndex = (Number(page) - 1) * Number(limit);
    
    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort(sortQuery)
      .limit(Number(limit))
      .skip(startIndex);

    res.json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: {
        tasks,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
        }
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      res.status(404);
      throw new Error('Task not found');
    }

    res.json({
      success: true,
      message: 'Task retrieved',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, status, category, dueDate } = req.body;

    const task = new Task({
      user: req.user._id,
      title,
      description,
      priority: priority || 'Medium',
      status: status || 'Pending',
      category: category || 'Personal',
      dueDate,
      activity: [{ action: 'Task Created' }]
    });

    const createdTask = await task.save();
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: createdTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const { title, description, priority, status, category, dueDate } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      res.status(404);
      throw new Error('Task not found');
    }

    const activityLog = [];
    if (priority && priority !== task.priority) activityLog.push({ action: `Priority Changed to ${priority}` });
    if (status && status !== task.status) activityLog.push({ action: `Status Changed to ${status}` });
    if (status === 'Completed' && task.status !== 'Completed') {
        task.completedAt = new Date();
        activityLog.push({ action: 'Marked Completed' });
    } else if (status && status !== 'Completed') {
        task.completedAt = null;
    }
    
    if (activityLog.length === 0) {
       activityLog.push({ action: 'Task Updated' });
    }

    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.category = category || task.category;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
    task.activity.push(...activityLog);

    const updatedTask = await task.save();
    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      res.status(404);
      throw new Error('Task not found');
    }

    await Task.deleteOne({ _id: task._id });
    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search tasks
// @route   GET /api/tasks/search
// @access  Private
const searchTasks = async (req, res, next) => {
  try {
    const { q = '', page = 1, limit = 10 } = req.query;
    const regex = new RegExp(q, 'i');
    
    const query = {
      user: req.user._id,
      $or: [
        { title: regex },
        { description: regex },
        { category: regex }
      ]
    };
    
    const startIndex = (Number(page) - 1) * Number(limit);
    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query).limit(Number(limit)).skip(startIndex);

    res.json({
      success: true,
      message: 'Search results retrieved',
      data: {
        tasks,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit))
        }
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  searchTasks
};
