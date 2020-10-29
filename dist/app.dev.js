"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var express = require('express'),
    app = express(),
    //* for environment variables
env = require('dotenv'),
    morgan = require('morgan'),
    //* template like ejs
exphbs = require('express-handlebars'),
    path = require('path'),
    passport = require('passport'),
    session = require('express-session'),
    connectDB = require('./config/db'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    mongostore = require('connect-mongo')(session),
    PORT = process.env.PORT || 3000; //* Load Config


env.config({
  path: './config/config.env'
}); //* Body Parser

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json()); //* Passport Config

require('./config/passport')(passport);

connectDB();

if (process.env.NODE_ENV === 'development') {
  //* shows the http requests made in the console.
  app.use(morgan('dev'));
} //* Handlebars Helpers


var _require = require('./helpers/hbs'),
    formatDate = _require.formatDate,
    truncate = _require.truncate,
    stripTags = _require.stripTags,
    editIcon = _require.editIcon,
    select = _require.select; //* handlebars
//* defaultlayout means the code which will be added
//* in all the views and the extension will be .hbs


app.engine('.hbs', exphbs({
  helpers: {
    formatDate: formatDate,
    truncate: truncate,
    stripTags: stripTags,
    editIcon: editIcon,
    select: select
  },
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new mongostore({
    mongooseConnection: mongoose.connection
  })
})); //* Passport Middleware

app.use(passport.initialize());
app.use(passport.session()); //* Set Global variable

app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
}); //* Method Override config

app.use(methodOverride(function (req, res) {
  if (req.body && _typeof(req.body) === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
})); //* Static folder

app.use(express["static"](path.join(__dirname, 'public'))); //* Routes

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));
app.listen(PORT, function () {
  console.log('Server Started Running...');
});