<template>
     <div class="container">
       <img preview="0" :src="require('../../static/bg.jpg')"/>
         <!-- <back-ground></back-ground> -->
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
       if(res.data.status=='0'){

          this.$store.dispatch('gosetLogin',res.data.userInfo)
          this.$socket.emit('enter', {data:res.data.userInfo.userId})
          this.$router.push({ name:'Chat',params:{user:res.userInfo}})
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
             width: 250px;
             height:250px;
             border:1px solid #eeeeee;
             border-radius: 10px;
             .title{

          text-align: center;
               font-weight: bold;
               font-size: 25px;
             }
             .el-input{
                 width: 140px;
             }
             .el-button{

                 display: block;
                 margin: 20px auto 0 auto;
             }
             .content{
               display: flex;
               align-items: center;
                 .front{
                   font-size: 14px;
                 display: inline-block;
                 width: 65px;
                 line-height: 16px;
                 font-weight: bold;
                 height: 16px;
                 text-align: center;

             }
             margin-top:20px;
             }
        }
    }
</style>>
