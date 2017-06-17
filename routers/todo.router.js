const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.js');

const errHandler = (err) => {
  return res.status(500).json({
    msg: err
  });
}

router.get('/todos', (req, res) => {
  Todo.find({}, (err, todos) => {
    if(err){
      return errHandler(err);
    }
    return res.status(200).json({
      todos: todos
    });
  });
});

router.get('/todos/:todoId', (req, res) => {
  Todo.find({_id: req.params.todoId}, (err, todo) => {
    if (err) {
      return errHandler(err);
    }
    return res.status(200).json({
      todo: todo
    });
  });
});

router.post('/todos', (req, res) => {
  console.log('req.body', req.body);
  let todo = new Todo(req.body);
  console.log(todo);
  todo.save(err => {
    if(err){
      return errHandler(err);
    }
    return res.status(200).json({
      msg: 'Successfly created a todo'
    });
  });
});

router.put('/todos/:todoId', (req, res) => {
  Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, (err, todo) => {
    if(err){
      return errHandler(err);
    }
    return res.status(200).json({
      msg: 'Successfully updated'
    });
  });
});

router.delete('/todos/:todoId', (req, res) => {
  Todo.remove({_id: req.params.todoId}, err => {
    if(err){
      return errHandler(err);
    }
    return res.status(200).json({
      msg: 'Successfully deleted'
    })
  })
})

module.exports = router;
