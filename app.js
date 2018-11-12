var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



//ROUTES TO CHANGE
var indexRouter = require('./routes/index');
var groupRouter = require('./routes/camball');


var database = require('./database/database');
database();

var app = express();

// Set layout
app.set('layout', 'layout')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

//ROUTES TO CHANGE
app.use('/', indexRouter);
app.use('/camball', groupRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // The following section handles errors generated by POST & PUT requests made when creating 
  // Or Updating the blog - Specifically if a Mongoose Validation Error is generated we want to 
  // ReRender our view on the Server with the relevant validation messages to provide a 'good' UX
  
  res.locals.message = err.message
  if (req.method === "POST" || req.method === "PUT" && err.name === 'ValidationError') {
    res.locals.post = req.body
    res.render('posts/new', {title: "New Blog Post"})
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
  
});

module.exports = app;
