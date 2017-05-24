const express          = require('express');
const path             = require('path');
const favicon          = require('serve-favicon');
const logger           = require('morgan');
const cookieParser     = require('cookie-parser');
const bodyParser       = require('body-parser');
const helmet           = require('helmet');
const passport         = require('passport');
const paypalRestSdk    = require('paypal-rest-sdk');
const session          = require('express-session');
const toffee           = require('toffee');

let app = express();
let peticio = require(path.resolve('./rutes/Peticions.js'));
let autenticacio = require(path.resolve('./rutes/Autenticacio.js'));
let api = require(path.resolve('./rutes/API.js'));
let admin = require(path.resolve('./rutes/Admin.js'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false  , limit: '50mb'}));
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

app.use('/', express.static(path.join(__dirname, 'vistes/client')));
app.use('/frontend' , peticio);
app.use('/autenticacio' , autenticacio);
app.use('/api' ,api);
app.use('/admin' ,admin);

app.set('views', path.join(__dirname, 'vistes/Admi'));
app.set('view engine', 'toffee');

//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.send("Error-> " + err);
// });

module.exports = app;
