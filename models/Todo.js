
const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    isDone: {
        type: Boolean,
        required: true

    },
    todoItem: {
        type: String,
        required: true,
        minlength: 1
    },
    createTodoDate: {
        type: String,
        required: true
    }
})

const Todo = mongoose.model('Todo', todoSchema, 'Todo')

exports.Todo = Todo