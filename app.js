var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');

var app = express();
var admin = express();
var sub = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


admin.get('/', function(req, res){
  console.log(admin.mountpath);
  res.send('Admin Homepage');
});

sub.get('/', function(req, res){
  console.log('Sub Homepage');
  res.send('Sub Homepage');
});

app.use('/admin', admin);
admin.use('/sub', sub);

// 后面的请求都会先到这里 然后5秒后执行后面相应的代码  可以实现拦截器
// app.use(function(req, res, next){
//   console.log('xx')
//   setTimeout(function(){
//     next()
//   }, 5000)
// })

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);





app.get('/', routes.index);
app.get('/users', users.list);
app.get('/teachers', users.teachers);


// 拦截器概念？
//app.use(function(req, res, next){
//  console.log(333)
//  setTimeout(function(){
//    console.log(222)
//    console.log(req.method);
//    next();
//  }, 5000);
//  next();
//});

app.post('/admin/article', function(req, res){
  console.log(111)
  res.json(200, {status: -1});
});





/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
