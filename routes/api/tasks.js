const express = require ('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Task = require('../../models/Task');

// @route   GET api/task/
// @desc    Get all tasks
// @access  Public
router.get('/', async (req, res) => {
    try {
        const tasks = await Task
            .find();
            // console.log(tasks);
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route   POST api/task/
// @desc    Create a task
// @access  Public
router.post('/', async (req, res) => {
    try {

        const {
            description,
            level,
            subtasks,
        } = req.body;

        const task = new Task({
            description: description,
            level: level,
            subtasks:subtasks,
        });

        await task.save();

        res.status(200).json({ task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/task/:id
// @desc    Edit a task
// @access  Public



// @route   POST api/task/:id/subtask
// @desc    Create a subtask
// @access  Public



// @route   DELETE api/task/:id
// @desc    Create a subtask
// @access  Public


module.exports = router;