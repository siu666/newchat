var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/get',function(req,res,next){
      res.json({
        status:"1"
      })
})
let user={'123':"123",'234':'234'}
router.all('/login',function(req,res,next){
      if(user[req.body.user]&&user[req.body.user]==req.body.password){
        res.json({
           status:"0"
        })
      }else{
        res.json({
          status:"400"
        })
      }

})
module.exports = router;
