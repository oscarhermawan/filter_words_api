const express = require('express');
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

var bodyParser = require('body-parser')
var users = require('./routes/users');

app.use(cors())

mongoose.connect('mongodb://localhost/triple-x', (err)=>{
  if(err){
    console.log(err);
  } else {
    console.log('Connection Success');
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', users);


app.listen(3000)
module.exports = app;
