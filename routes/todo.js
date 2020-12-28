const express = require('express')
const Joi = require('joi')
const route = express.Router()
const asycnMiddleWare = require('../middleware/asycn')
const autho = require('../middleware/autho')
const { Todo } = require('../models/Todo')

const validate = (req) => {
    const schema = Joi.object({
        todoItem: Joi.string().min(2).required(),
    })
    if (req.isDone || req._id) {
        return true
    }
    else {
        return schema.validate(req)
    }
}

route.post('/', autho, asycnMiddleWare(async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(401).send({ errorMessage: error.details[0].message })
    let todo = new Todo({
        todoItem: req.body.todoItem,
        isDone: false,
        createTodoDate: String(new Date().getTime())
    })
    await todo.save()
    const todos = await Todo.find()
    res.send(todos)

}))

route.get('/user', autho, asycnMiddleWare(async (req, res) => {
    const q = req.query.q
    const filter = req.query.filter
    let query = {
        todoItem: {
            "$regex": ".*" + q + "*.",
            "$options": "i"
        },
        isDone: filter
    }
    console.log('filter', filter)
    console.log('Q', q)
    if (!q) delete query.todoItem
    if (!filter) delete query.isDone
    console.log('query', query)
    const todos = await Todo.find(query)
    res.send(todos)
}))

route.get('/:id', autho, asycnMiddleWare(async (req, res) => {
    if (!req.params.id) return res.status(401).send({ errorMessage: 'todo item not found' })
    let todos = await Todo.findById(req.params.id)
    if (!todos) return res.status(401).send({ errorMessage: 'todo item not found' })
    res.send(todos)
}))

route.delete('/:id', autho, asycnMiddleWare(async (req, res) => {
    if (!req.params.id) return res.status(401).send({ errorMessage: 'todo item not found' })
    let todos = await Todo.findByIdAndDelete(req.params.id)
    if (!todos) return res.status(401).send({ errorMessage: 'todo item not found' })
    todos = await Todo.find()
    res.send(todos)
}))

route.put('/:id', autho, asycnMiddleWare(async (req, res) => {
    if (!req.params.id) return res.status(401).send({ errorMessage: 'todo item not found' })
    const { error } = validate(req.body)
    // console.log(error)
    if (error) return res.status(401).send({ errorMessage: error.details[0].message })
    let todos = await Todo.findByIdAndUpdate(req.params.id, {
        ...req.body
    })
    if (!todos) return res.status(401).send({ errorMessage: 'todo item not found' })
    todos = await Todo.find()
    res.send(todos)
}))

module.exports = route