const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  try {
    const { title, description, category, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a title' });
    }

    const taskData = {
      title: title.trim(),
      description: description ? description.trim() : ''
    };
    if (category) taskData.category = category;
    if (dueDate) taskData.dueDate = new Date(dueDate);

    const task = await Task.create(taskData);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Edit task title, description or mark as completed
// @route   PUT /api/tasks/:id
// @access  Public
const editTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    const { title, description, completed, category, dueDate } = req.body;
    
    // Check if the task is already completed when trying to complete it
    if (completed === true && task.completed === true) {
        return res.status(400).json({ success: false, message: 'Task is already marked as complete.' });
    }

    const updateFields = {};
    if (title && title.trim()) updateFields.title = title.trim();
    if (description !== undefined) updateFields.description = description.trim();
    if (completed !== undefined) updateFields.completed = completed;
    if (category) updateFields.category = category;
    if (dueDate !== undefined) updateFields.dueDate = dueDate ? new Date(dueDate) : null;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.error('Error editing task:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    
    await task.deleteOne();
    res.status(200).json({ success: true, message: 'Task removed' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  createTask,
  getTasks,
  editTask,
  deleteTask
};
