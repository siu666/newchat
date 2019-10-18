<template>
  <div class="chat" id="chat">
        <!-- <back-ground></back-ground> -->
       <!-- <header>Chat</header> -->
       <transition name="move">

          <talk v-if="to" :to="to"></talk>
       </transition>
       <keep-alive>
          <component :is="comp" @goChat="goChat"></component>
       </keep-alive>

       <tab-bar v-model="value"></tab-bar>
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
import chatComp from './chatComp'
import User from './User'
import My from './My'
import axios from 'axios'
export default {

components:{
     backGround,
     NavLeft,
     talk,
     TabBar,
     chatComp,
     User,
     My
   },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user:"",
      chatList:[],
      value:"",
      to:"",
      value:"0"
    }
  },
  computed:{
    comp(){
      switch(this.value){
          case 0:
            return 'chatComp'
            break;
            case 1:
              return 'User';
              break;
              case 2:
                return 'My'
                default:
                   return 'chatComp';
                   break

      }
    }
  },
  created(){
     this.user=this.$route.params.user


          // this.$socket.emit('enter', {data:this.user})


    // this.$socket.emit('emit_method', {data:"123"})

  },


  methods:{
    goChat(val){
        this.to=val.name
    },
    send(val){
          this.talkList.push( {from:this.user,value:this.value,to:this.to}  )
          this.$socket.emit('send', {from:this.user,value:this.value,to:this.to})
    },
    // goChat(item){
    //  this.to=item
    // }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .move-enter-active,  .move-leave-active {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
  }
 .move-enter,  .move-leave {
    transform: translate3d(100%, 0, 0);
  }
   .chat{
      display: flex;
      flex-direction: column;
   }
</style>
