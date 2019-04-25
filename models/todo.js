const mongoose = require('mongoose');
const schema = mongoose.Schema;

const todoSchema = new schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date, 
    default: Date.now()
  },
  creator: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

const todo = mongoose.model('todo', todoSchema);
module.exports = todo;
