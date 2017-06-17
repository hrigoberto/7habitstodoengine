const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Array,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

todoSchema.pre('findOneAndUpdate', function(){
  this.update({}, { $set: { updated: Date.now() }})
})

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
