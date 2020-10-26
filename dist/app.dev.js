"use strict";

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
    mongostore = require('connect-mongo')(session),
    PORT = process.env.PORT || 3000; //* Load Config


env.config({
  path: './config/config.env'
}); //* Passport Config

require('./config/passport')(passport);

connectDB();

if (process.env.NODE_ENV === 'development') {
  //* shows the http requests made in the console.
  app.use(morgan('dev'));
} //* handlebars
//* defaultlayout means the code which will be added
//* in all the views and the extension will be .hbs


app.engine('.hbs', exphbs({
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
app.use(passport.session()); //* Static folder

app.use(express["static"](path.join(__dirname, 'public'))); //* Routes

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.listen(PORT, function () {
  console.log('Server Started Running...');
});