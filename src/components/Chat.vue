<template>
  <div class="chat">
        <back-ground></back-ground>


       <div class="chatContainer">

           <!-- <nav-left :username="user"></nav-left>
           <div></div> -->
       </div>

  </div>
</template>

<script>
import NavLeft from './Nav.vue'
import backGround from './bg.vue'

import axios from 'axios'
export default {

components:{
     backGround,
     NavLeft
   },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user:"",
      talkList:[],
      value:""
    }
  },
  created(){
     this.user=this.$route.params.user


          // this.$socket.emit('enter', {data:this.user})


    // this.$socket.emit('emit_method', {data:"123"})
    this.sockets.subscribe('login', (data) => {
         console.log(data)
    });//全局注册监听
    this.sockets.subscribe('message', (data) => {
         this.talkList.push(data)
    });//全局注册监听
  },

  socket:{
      connection(data){
         console.log(data)
      },
      login(DATA){
        console.log(DATA)
      }
  },
  methods:{
    send(val){
          this.talkList.push( {from:this.user,value:this.value,to:'345'}  )
          this.$socket.emit('send', {from:this.user,value:this.value,to:'345'})
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
   .chat{
     display: flex;
    //  align-items: center;
    //  justify-content: center;
     height: 100vh;
     position: relative;
     .chatContainer{
       top:50%;
       left: 50%;
       margin-top: -250px;
       margin-left: -50px;

       width: 100px;
       background-color: #ffffff;
       height: 500px;
       position: absolute;

       z-index: 99;
     }
   }
</style>
