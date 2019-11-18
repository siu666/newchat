<template>
  <div class="chat" id="chat">
        <!-- <back-ground></back-ground> -->
       <!-- <header>Chat</header> -->
       <div class="header">Conn</div>
       <init-group @goChat="goChat"></init-group>
       <transition name="move">


          <talk v-if="currentChatId" :onChatType="onChatType" :chatter="chatter"  :to="to"  :user="userInfo" @destory="destory" :chatList="onChatList" ref="talk"></talk>
       </transition>
       <div class="tabContent">
         <keep-alive>
          <component :allChat="allChat" :is="comp" @goChat="goChat"></component>
       </keep-alive>
       </div>


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
import initGroup from './initGroup'
export default {

components:{
     backGround,
     NavLeft,
     talk,
     TabBar,
     chatComp,
     User,
     My,
     initGroup
   },
  name: 'Chat',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      chatList:[],
      value:"",
      to:"",
      value:"0",
      currentChatId:'',
      chatter:[]
    }
  },
  watch:{
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
    },
    allChat(){
       return this.$store.state.chatList
    },
    userInfo(){
      return this.$store.state.loginUser
    },
    onChatType(){
      return this.$store.state.chatList.filter(item=>{
            return item.chatId==this.currentChatId
        })[0].isGroup
    },
    onChatList(){
      return this.$store.state.chatList.filter(item=>{
            return item.chatId==this.currentChatId
        })[0].chatList.sort((a,b)=>{
                 return a.time - b.time
        })
    }
  },
  created(){
     this.sockets.subscribe('getUnread', (data) => {
       data.forEach(item=>{
         item.isRecv=true;
         item.isGroup=item.chatter.length>1
        this.$store.dispatch('goSetChatList',item)
       })
    });
    this.sockets.subscribe('message', (data) => {
    //   data.chatter=data.from
    // if(data.ExitGroup||data.ExitGroup!=undefined){

    // }
    data.isGroup=data.chatter.length>1;
    data.isRecv=true;
     this.$store.dispatch('goSetChatList',data);
     
     if(this.currentChatId){
       setTimeout(()=>{
        this.$refs.talk.$refs.chatBoard.toBottom()

     },100)
        //当前正在某个通讯仲
     }
    })
          // this.$socket.emit('enter', {data:this.user})


    // this.$socket.emit('emit_method', {data:"123"})

  },
  methods:{
    destory(){
     this.currentChatId=''
    },
    goChat(val){

           this.chatter=val.chatter
           this.currentChatId=this.$store.state.currentChatId

      // this.currentChat=
        // this.to=val

        // if(!this.allChat.length){
          //如果聊天记录为空的初始化操作
            // this.$store.dispatch('goSetChatList',{chatter:[this.to]})
        // }

        // console.log(this.$store.state.chatList)
    },
    send(val){
          this.talkList.push( {from:this.userInfo,value:this.value,to:this.to}  )
          this.$socket.emit('send', {from:this.userInfo,value:this.value,to:this.to})
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
     .header{

        position: relative;
        width: 100%;
        background: #f5f5f5;
        font-size: .36rem;
        text-align: center;
        line-height: 1rem;
        height: 1rem;
     }
     .tabContent{
        height: calc(100vh - 2rem);
        overflow-y: scroll;
     }
      display: flex;
      flex-direction: column;
   }
</style>
