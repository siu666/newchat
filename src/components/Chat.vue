<template>
  <div class="chat">
        <!-- <back-ground></back-ground> -->
       <!-- <header>Chat</header> -->
       <component :is="comp"></component>
       <tab-bar></tab-bar>
       <!-- <div class="chatContainer">

           <nav-left :username="user" @goChat="goChat"></nav-left>
           <talk :to="to" :user="user"></talk>
       </div> -->

  </div>
</template>

<script>
import TabBar from './tab'
import NavLeft from './Nav.vue'
import talk from './talk'
import backGround from './bg.vue'

import axios from 'axios'
export default {

components:{
     backGround,
     NavLeft,
     talk,
     TabBar
   },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user:"",
      chatList:[],
      value:"",
      to:"",
      comp:''
    }
  },
  created(){
     this.user=this.$route.params.user


          // this.$socket.emit('enter', {data:this.user})


    // this.$socket.emit('emit_method', {data:"123"})
   
  },

 
  methods:{
    send(val){
          this.talkList.push( {from:this.user,value:this.value,to:this.to}  )
          this.$socket.emit('send', {from:this.user,value:this.value,to:this.to})
    },
    goChat(item){
     this.to=item
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
       margin-top: -325px;
       margin-left: -500px;

       width: 1000px;
       background-color: #ffffff;
       height: 650px;
       position: absolute;

       z-index: 99;
       display: flex;
     }
   }
</style>
