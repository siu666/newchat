<template>
     <div class="container">
         <back-ground></back-ground>
         <div class="box">
            <p class="title">Login</p>
               <div class="content"><span class="front">User</span><el-input v-model="user" placeholder="请输入用户名"></el-input></div>
               <div class="content"><span class="front">Password</span>             <el-input v-model="value" type="password" placeholder="请输入密码"></el-input></div>
               <el-button @click.native="login">log In</el-button>

         </div>
     </div>
</template>
<script>
import backGround from './bg.vue'

import axios from 'axios'
export default {
  components:{
    backGround
  },
data(){
  return{
    user:'',
    value:""
  }
},
methods:{
  login(){
    axios.post('/users/login',{user:this.user,password:this.value}).then(res=>{
      console.log(res)
       if(res.data.status=='0'){
          this.$socket.emit('enter', {data:this.user})
          this.$router.push({ name:'Chat',params:{user:this.user}})
       }
    })
  }
},
}
</script>
<style lang="scss">
    .container{

      position: relative;
      display: flex;
      align-items: center;
      height: 100vh;
      justify-content: center;
      // filter:blur(100px);

        .box{
          background:rgba(255,255,255,0.8);
          position:absolute;
             width: 350px;
             height:350px;
             border:1px solid #eeeeee;
             border-radius: 10px;
             .title{

          text-align: center;
               font-weight: bold;
               font-size: 25px;
             }
             .el-input{
                 width: 200px;
             }
             .el-button{

                 display: block;
                 margin: 50px auto 0 auto;
             }
             .content{
               display: flex;
               align-items: center;
                 .front{
                 display: inline-block;
                 width: 100px;
                 line-height: 50px;
                 font-weight: bold;
                 height: 50px;
                 text-align: center;

             }
             margin-top:20px;
             }
        }
    }
</style>>
