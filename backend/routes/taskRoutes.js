const express = require('express');
const { getTasks, createTask, editTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(editTask)
  .delete(deleteTask);

module.exports = router;
