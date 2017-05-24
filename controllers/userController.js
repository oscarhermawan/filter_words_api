var db = require('../models/user');
var bcrypt  = require('bcrypt')
var jwt = require('jsonwebtoken')
const saltRounds = 10;

const methods = {}

methods.createUser = function(req,res){
  bcrypt.hash(req.body.password, saltRounds)
  .then((hash)=>{
    var userInput = new db({
      username:req.body.username,
      password:hash,
      name : req.body.name,
    })
    userInput.save(function(err,result){
      if(err){
        res.send(err)
      } else {
        res.send(result)
      }
    })
  })
}// CREATE USER

methods.getAllUsers = function(req, res) {
  db.find(function(err, User) {
    if(err){
      console.log(err);
    } else {
      res.send(User)
    }
  })
}

//LOCAL LOGIN
methods.signIn = function (req,res) {
  var getUser = db.findOne({username : req.body.username})
  getUser.exec(function(err, user){
    bcrypt.compare(req.body.password, user.password)
      .then((value)=>{
        if(value == true){
          let token = jwt.sign({username: user.username, name:user.name}, 'secret')
          res.send(token)
        }
        else{
          res.send('password tidak cocok')
        }
      })
  })
}//LOCAL LOGIN



module.exports = methods
