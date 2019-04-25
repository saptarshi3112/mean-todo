const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const userApi = require('./routes/userapi');
const todoApi = require('./routes/api');

const config = require('./config/config');
mongoose.connect(config.db, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (err) => {
  if(err) {
    throw err;
  } else {
    console.log('mongo => connected');
  }
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use('/user/', userApi);
app.use('/todo/', todoApi);

const port = 5000;
app.listen(port, (err) => {
  if(err) {
    throw err;
  } else { 
    console.log('server on port ' + port);
  }
});
