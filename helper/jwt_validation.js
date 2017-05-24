
var jwt = require('jsonwebtoken')
const methods = {}

methods.verifyLogin = function(req,res, next){
  jwt.verify(req.headers.token, process.env.SECRET, function(err, decoded){
    if(!err){
      if(decoded.role == 'admin' || decoded.id == req.params.id){
        next()
      }
      else{
        res.send('Anda Tidak punya Akses')
      }
    }
    else {
      res.send(err)
    }
  })
}

module.exports = methods
