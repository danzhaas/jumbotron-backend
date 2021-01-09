const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: {
        type:String,
        required:true
    },
    done: {
        type:Boolean,
        required:true,
        default: false,
    },
    level: {
        type:Number,
        required:true,
        default:0
    },
    subtasks: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
        }
    ],
    timecreated: {
        type:Date,
        default:Date.now
    },
    timedone: {
        type:Date
    },
});

module.exports = Task = mongoose.model('task', TaskSchema)