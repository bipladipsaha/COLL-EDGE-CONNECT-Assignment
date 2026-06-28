const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, createTask, updateTask, deleteTask, searchTasks } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Apply protect middleware to all task routes

router.get('/search', searchTasks);
router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
