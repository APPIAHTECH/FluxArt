const express          = require('express');
const path             = require('path');
const favicon          = require('serve-favicon');
const logger           = require('morgan');
const cookieParser     = require('cookie-parser');
const bodyParser       = require('body-parser');
const multer           = require('multer');
const bcrypt           = require('bcrypt');
const helmet           = require('helmet');
const nodemailer       = require('nodemailer');
const passport         = require('passport');
const paypalRestSdk    = require('paypal-rest-sdk');
const session          = require('express-session');

let app = express();
let peticio = require(path.resolve('./rutes/Peticions.js'));
let autenticacio = require(path.resolve('./rutes/Autenticacio.js'));
let api = require(path.resolve('./rutes/API.js'));

//Ruta de emmagatzematge
let emmagatzematge = multer({ dest: 'emmagatzematge/' });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Sessions
app.use(session({
  secret: 'FluxSession', //Aquest codi secret per la sessio
  resave: false, //
  saveUninitialized: false //
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(path.join(__dirname, 'client')));
app.use('/frontend' , peticio);
app.use('/autenticacio' , autenticacio);
app.use('/api' ,api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
