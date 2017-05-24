var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

var appRecent = require('./routes/twatt_recent')

app.use('/timeline', appRecent )

app.listen(3000, ()=>{
     console.log('on ');
})
