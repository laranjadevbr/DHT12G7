const axios = require('axios');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const router = require('./routes');
const session = require('express-session');
require('dotenv').config();

const {
  capitalize,
  cleaner,
  currency,
  dismember,
  getCNPJ,
  getCPF,
  getNumber,
  getPhone,
  getRandomDate,
  getRandomInt,
  navbar,
  onlyNumbers,
  pageTitle,
  plural,
  readjust,
  roman,
  saver,
  script,
  urlPath,
  validate,
  viewName,
} = require('./utils');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());

app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));

app.use(session({
  secret : 'project-name',
  resave : true,
  saveUninitialized : true,
  cookie : {
    secure : true,
  },
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended : false,
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

const routers = [
  // ['/', '/index'], 
];

for (let i = 0; i < routers['length']; i++)
  app.use(routers[i][0], (req, res, next) => {
    return res.redirect(routers[i][1]);
  });

app.use((req, res, next) => {
  return res.status(404).render('404', {
    capitalize,
    cleaner,
    currency,
    pageMessage : 'this page is not found!',
    roman,
    script : script('404'),
    validate,
    session : (req, res, next) => {
      return req.session.user;
    },
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : { };
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;