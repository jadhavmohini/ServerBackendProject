var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = process.env.PORT || 8000; 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose=require('mongoose')
var app = express();
var cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var http = require('http').Server(app);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Database Connection String
var server = app.listen(port);
console.log('Magic happens at http://localhost: ' + port);
const mongoUrl = 'mongodb://localhost:27017/UserDB'
var conc = mongoose.connect(mongoUrl,
    (err) => {
        if (err) {
            console.log("Error connect to mongoose TOUCH", err)
        } else {

            console.log(" connected at UserDB 27017")
        }
});
app.use(express.static(path.join(__dirname, "/public"), { maxAge: 31557600000000 }));
module.exports = app;

