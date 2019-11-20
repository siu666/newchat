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
let unread={}
io.sockets.on('connection', (socket) => {
  console.log('链接成功');
  socket.on('leave',(data)=>{
      delete(array[data])
  })
  socket.on('ExitGroup',(data)=>{
       console.log(data)
  })
  socket.on('enter', (DATA) => {
      console.log(socket.id)
    // if(!array[DATA.data]){
      array[DATA.data]=socket.id

    // }
    if(unread[DATA.data]){
       io.to(array[DATA.data]).emit('getUnread',unread[DATA.data].unreadList)
       delete(unread[DATA.data])
    }
    // userObj[DATA.data]=DATA.data;
    console.log('用户'+DATA.data+'进入')
  });
  socket.on('send', (DATA) => {
    console.log(DATA.value)
    DATA.chatter.forEach(item=>{
      if(!array[item.userId]){

        if(!unread[item.userId]){

          unread[item.userId]={
            unreadList:[]
          }
        };

         unread[item.userId].unreadList.push(DATA)
         console.log(unread)
         return
      }
     io.to(array[item.userId]).emit('message',DATA)
    })

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
global.array=array
module.exports = app;
