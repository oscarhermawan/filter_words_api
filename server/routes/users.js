var express = require('express');
var api = require('../controllers/userController')
var router = express.Router();
var jwt = require('../helper/jwt_validation')

router.get('/', api.getAllUsers)
router.post('/signup', api.createUser)
router.post('/signin', api.signIn)
router.delete('/twitter/:idstatus', jwt.verifyLogin, api.deleteStatusTwitter)
router.post('/twitter', jwt.verifyLogin, api.badwords, api.updateStatusTwitter)

// router.delete('/:id', jwt.verifyAdmin, api.deleteUser)
// router.put('/:id', jwt.verifyLogin, api.updateUser)
// router.get('/:id', jwt.verifyLogin, api.getSingleUser)



module.exports = router
