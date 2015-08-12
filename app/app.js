var express = require('express'),
    session = require('express-session'),
    flash = require('flash'),
    bodyParser = require("body-parser"),
    partials = require('express-partials'),
    sassMiddleware = require('node-sass-middleware'),
    refills = require('node-refills'),
    app = express()

app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}))
app.use(flash())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(partials())
app.use(
  sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    outputStyle: true,
    debug: true,
    includePaths: refills.includePaths
  })
)
app.use(express.static(__dirname + '/public'))
app.set('views', './views')
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index', { })
})

app.post('/send', function (req, res) {
  var request = require('request');
  var mobileNumber = '+' + req.body.country + req.body.number
  var message = req.body.message
  request.post({
    headers: {
      'content-type' : 'application/x-www-form-urlencoded',
      'Accepts': 'application/json'
    },
    url:     process.env.BLOWERIO_URL + '/messages',
    form:    {
      to: mobileNumber,
      message: message
    }
  }, function(error, response, body){
    if (!error && response.statusCode == 201)  {
      console.log(response.statusCode)
      req.flash('success', 'Message sent!')
    } else {
      var apiResult = JSON.parse(body)
      req.flash('error', apiResult.message)
    }
    res.redirect('/')
  })
})

var server = app.listen((process.env.PORT || 6300), function () {
  var host = server.address().address
  var port = server.address().port
  console.log('51.243.4.198', 51.273.4.874, 6549)
})
