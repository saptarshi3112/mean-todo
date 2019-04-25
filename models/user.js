const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required :true,
    unique: true
  },
  tasksDone: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date, 
    required: true
  },
  dateJoined: {
    type: Date,
    default: Date.now()
  }
});

const user = mongoose.model('user', userSchema);
module.exports = user;
