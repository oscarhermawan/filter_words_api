var express = require('express')
var router = express.Router();
var appTwitter = require('../controller/twatt_recent_controller')

router.post('/' , appTwitter.updateStatusTwitter )


module.exports = router;
