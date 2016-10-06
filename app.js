var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var birds = require('./public/javascripts/script');
var nodemailer = require("nodemailer");
var app = express();

//setting up SMTP stream
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "tmutambwe@gmail.com",
        pass: "25019600"
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/time', birds);

app.use('/static', express.static('public/mac_world'));

//middleware for sending email
app.use('/send', function (req, res) {
    var id = 'Hi ' + req.query.name;
    console.log(id);
    var mailOptions;
    mailOptions = {
        to: req.query.to,
        subject: req.query.subject,
        text: req.query.text,
        html: '<div>Hi there!' +
            '<br><br> Thanks for contacting us on our platform, your request has been received and we will get in touch with you soon' +
            '<br> Take it easy' +
            '<br> <a href="http://tawanda.me">Team Mac World</a>' +
        '<br> <br><sub>If you got this message by mistake please click <a href="http://localhost:3000/uncontact">here</a> and destroy this message immediately</sub></div>'
    };

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

//middleware for subscribing to the newsletter
app.use('/subscribe', function (req, res) {

    var mailOptions;
    mailOptions = {
        to: req.query.email,
        subject: 'Monthly Newsletter',
        text: '',
        html: '<div>Hi there!' +
        '<br><br> Thanks for subscribing to our monthly newsletter,' +
            '<br> You wanna contribute to the newsletter, talk to US via this email' +
        '<br> Take it easy' +
        '<br> <a href="http://tawanda.me">Team Mac World</a>' +
        '<br> <br><sub>If you got this message by mistake please click <a href="http://localhost:3000/unsubscribe">here</a> and destroy this message immediately</sub></div>'
    };

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
