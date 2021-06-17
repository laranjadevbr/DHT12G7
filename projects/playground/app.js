var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// 
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
// 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 
var middlewares = require('./middlewares/log');
// 
const app = express();
// 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret : 'myproject',
  resave : true,
  saveUninitialized : true
}));
// 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 
app.use(methodOverride('_method'));
app.use(middlewares.urllog);
app.use(middlewares.cookie);
// 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use((req, res) => {
  return res.status(404).render('index', { title : 'not found!' });
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;