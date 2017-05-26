
var jwt = require('jsonwebtoken')
const methods = {}

methods.verifyLogin = function(req,res, next){
  console.log(req.body);
  jwt.verify(req.headers.token, 'secret', function(err, decoded){
    if(!err){
      if(decoded.username){
        next()
      }
      else{
        res.send('Anda Tidak punya Akses')
      }
    }
    else {
      res.send('Anda tidak punya Akses')
    }
  })
}

module.exports = methods
