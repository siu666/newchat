var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const server=require('http').Server(app)
const io=require('socket.io')(server)
var app = express();
server.listen(8081,function(){
  console.log('Node app start at port 3000')
})
let array = {};
io.sockets.on('connection', (socket) => {
  console.log('链接成功');

  socket.on('enter', (DATA) => {
    if(!array[DATA.data]){
      array[DATA.data]=socket

    }
    // userObj[DATA.data]=DATA.data;
    console.log('用户'+DATA.data+'进入')
  });
  socket.on('send', (DATA) => {
    console.log(DATA)
    array[DATA.to].emit('message',DATA)
    // var toSocket = _.findWhere(io.sockets.sockets, {id: to});
    // toSocket.emit('')
  });
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

module.exports = app;
