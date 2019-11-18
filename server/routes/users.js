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
let user={'123':[{userId:"A1",userType:"client",pwd:'123'}],'234':[{userId:"B2",userType:"client",pwd:'234'}],'345':[{userId:"C3",userType:"client",pwd:'345'}],'456':[{userId:"D4",userType:"server",pwd:'456'}]
,'567':[{userId:"E5",userType:"server",pwd:'567'}]}
router.all('/login',function(req,res,next){
      if(user[req.body.user]&&user[req.body.user][0]['pwd']==req.body.password){
        console.log(array)
        res.json({
           status:"0",
           userInfo:user[req.body.user][0]
        })
      }else{
        res.json({
          status:"400"
        })
      }

})
module.exports = router;
