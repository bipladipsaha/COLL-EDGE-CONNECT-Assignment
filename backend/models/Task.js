const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      minlength: 3,
      maxlength: 80,
    },
    description: {
      type: String,
      maxlength: 500,
      default: '',
    },
    priority: {
      type: String,
      required: [true, 'Please add a priority'],
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    status: {
      type: String,
      required: [true, 'Please add a status'],
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Personal', 'Work', 'Study', 'Shopping', 'Health', 'Finance', 'Custom'],
      default: 'Personal',
    },
    dueDate: {
      type: Date,
      required: false,
    },
    completedAt: {
      type: Date,
    },
    activity: [
      {
        action: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
