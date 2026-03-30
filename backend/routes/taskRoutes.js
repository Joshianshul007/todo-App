const express = require('express');
const { getTasks, createTask, updateTask } = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .put(protect, updateTask);

module.exports = router;
