var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var cors = require('cors');
var domain = require('domain'); //异常处理
var routes = require('./routes/index');
var users = require('./routes/users');
var ResResult = require('./entity/ResResult')



var app = express();

var corsOptions = {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'HEADER'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders:'Set-Cookie',
    optionsSuccessStatus: 200,

  }
app.use(cors(corsOptions))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* 使用cookie
app.use(cookieParser('goodluck'));
app.use(session({
    secret:'an',
    resave:false,
    saveUninitialized:true
})); */
// 使用 session 中间件
app.use(session({
    name: 'skey',
    secret: 'chyingp', // 用来对session id相关的cookie进行签名
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    rolling: true,
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
      maxAge: 10 * 1000 // 有效期，单位是毫秒
    }
  }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') { 
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err)
        var result = new ResResult({code:999,data:null,msg:err.message})
        res.json(result);
    });
} else {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err)
        var result = new ResResult({code:999})
        res.json(result);
    });
}




module.exports = app;
