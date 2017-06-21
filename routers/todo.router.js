const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.js');

const errHandler = (err) => res.status(500).json({ msg: err });
const successMsgHandler = (key = 'msg', value = 'success') => res.status(200).json({key, value});

router.get('/todos', (req, res) => {
  Todo.find({}, (err, todos) => err ? errHandler : successMsgHandler('todos', todos));
});

router.get('/todos/:todoId', (req, res) => {
  Todo.find({_id: req.params.todoId}, (err, todos) => err ? errHandler : successMsgHandler('todos', todos));
});

router.post('/todos', (req, res) => {
  let todo = new Todo(req.body);
  todo.save(err => err ? errHandler : successMsgHandler());
});

router.put('/todos/:todoId', (req, res) => {
  Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, (err, todo) => err ? errHandler : successMsgHandler());
});

router.delete('/todos/:todoId', (req, res) => {
  Todo.remove({_id: req.params.todoId}, err => err ? errHandler : successMsgHandler());
})

module.exports = router;
