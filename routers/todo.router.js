const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.js');

const errHandler = (err) => res.status(500).json({ msg: err });
const successMsgHandler = (res, key = 'msg', value = 'success') => res.status(200).json({key, value});

router.get('/todos', (req, res) => {
  Todo.find({}, (err, todos) => err ? errHandler : successMsgHandler(res, 'todos', todos));
});

router.get('/todos/:todoId', (req, res) => {
  Todo.find({_id: req.params.todoId}, (err, todos) => err ? errHandler : successMsgHandler(res, 'todos', todos ));
});

router.post('/todos', (req, res) => {
  let todo = new Todo(req.body);
  todo.save(err => err ? errHandler : successMsgHandler(res));
});

router.put('/todos/:todoId', (req, res) => {
  Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, (err, todo) => err ? errHandler : successMsgHandler(res));
});

router.delete('/todos/:todoId', (req, res) => {
  Todo.remove({_id: req.params.todoId}, err => err ? errHandler : successMsgHandler(res));
})

module.exports = router;
