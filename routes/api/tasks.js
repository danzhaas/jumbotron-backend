const express = require ('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Task = require('../../models/Task');

// @route   GET /api/task/
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


// @route   POST /api/task/
// @desc    Create a root task
// @access  Public
router.post('/', async (req, res) => {
    try {

        const {
            description
        } = req.body;

        const task = new Task({
            description
        });

        await task.save();

        res.status(200).json({ task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   PUT /api/task/:id
// @desc    Edit a task
// @access  Public
router.put('/', async (req, res) => {
    try {

        const {
            description,
            done
        } = req.body;

        const task = await Task
        .findById( req.params.id );

        task = {
            ...task,
            description, 
            done
        }

        await task.save();

        // If the task has been completed and has children, we update all children so done=true .
        // if ((task.done === true) && (task.children.length>0)) {
        // async function markDone (childId) {
        //     var doneChild = await Task.findById( childId );
        //     doneChild.done = true;
        // }

        //     var allChildren = [];
        //     var theseChildren = [];
        //     for ( i = task.level; i > 5; i++ ) {    // so as to prevent infinite loops
        //         task.children.forEach(childId => {
        //             //create an array of the children on all deeper levels


        //             //
        //             markDone(childId);
        //         })
        //     }
        // }

        res.status(200).json({ task });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route   POST /api/task/:id/subtask
// @desc    Create a subtask
// @access  Public
router.post('/', async (req, res) => {
    try {

        const parentTask = await Task
        .findById( req.params.id );

        if (parentTask.level === 5) return res.status(400).json({msg:'Cannot make subtasks 6 levels deep.'});

        const childTask = new Task({
            description,
            level: (parentTask.level + 1),
            parent: parentTask.id
        });

        await childTask.save();

        parentTask.children = parentTask.children.push( childTask.id );

        await parentTask.save();

        res.status(200).json({ childTask });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route   DELETE /api/task/:id
// @desc    Delete a task
// @access  Public


module.exports = router;