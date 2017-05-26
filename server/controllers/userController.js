var db = require('../models/user');
var bcrypt  = require('bcrypt')
var jwt = require('jsonwebtoken')
var badwordsDictionary = require('../helper/dictionary.js')
var Filter = require('bad-words')
var OAuth = require('oauth');
require('dotenv').config()
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

//filter
methods.badwords = function(req, res, next) {
  var filter = new Filter({placeHolder: 'x'})
  filter.addWords(badwordsDictionary)
  var words = filter.clean(req.body.kata)
  req.body.text = words
  next()
}
//filte

methods.updateStatusTwitter = function(req,res){
  console.log('masuk ',req.body);
      var oauth = new OAuth.OAuth(
           'https://api.twitter.com/oauth/request_token',
           'https://api.twitter.com/oauth/access_token',
           process.env.API_KEY, //Consumer Key (API Key)
           process.env.API_SECRET, //Consumer Secret (API Secret)
           '1.0A',
           null,
           'HMAC-SHA1'
         );
         oauth.post(
         'https://api.twitter.com/1.1/statuses/update.json?status=' + req.body.text,
         process.env.USER_ACCEES_TOKEN, //test user token //Access Token
         process.env.USER_SECRET_TOKEN, //test user secret //Access Token Secret
         req.body.text,
         "text",
         function (err, data){
            // console.log('halooo ==>',words);
           if (err) console.error(err);
           let idtweet = JSON.parse(data)
           res.send(idtweet);
         });
}

methods.deleteStatusTwitter = function(req,res){
  console.log(req.params.idstatus);
      var oauth = new OAuth.OAuth(
           'https://api.twitter.com/oauth/request_token',
           'https://api.twitter.com/oauth/access_token',
           process.env.API_KEY, //Consumer Key (API Key)
           process.env.API_SECRET, //Consumer Secret (API Secret)
           '1.0A',
           null,
           'HMAC-SHA1'
         );

         oauth.post(
         'https://api.twitter.com/1.1/statuses/destroy/' + req.params.idstatus +'.json',
         process.env.USER_ACCEES_TOKEN, //test user token //Access Token
         process.env.USER_SECRET_TOKEN, //test user secret //Access Token Secret
         req.body.text,
         "text",
         function (err, data){
            // console.log('halooo ==>',words);
           if (err) console.error(err);
           console.log(require('util').inspect(data));
           res.send(JSON.parse(data));
         });
}


module.exports = methods
