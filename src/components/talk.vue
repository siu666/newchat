<template>
    <div class="talk" id="talk"  >
            <chat-header :to="to"></chat-header>
            <chat-board :chatList="chatList" :user="user" ref="chatBoard"></chat-board>

            <test @getData="getData" @send="send" v-if="to"></test>
    </div>
</template>
<script>
import {addListen} from './inout'
import chatHeader from './talkComp/header'
import ChatBoard from './talkComp/chatBoard'
import Test from './talkComp/test'
export default {
    data(){
      return{
         value:"",
         chatList:[],
      }
    },
    props:{
      to:{
        type:String,
        default:""
      },
      user:{
        type:String,
        default:""
      }
    },
components:{
  Test,
  ChatBoard,
  chatHeader
},
mounted(){
  setTimeout(()=>{
  addListen(this.set);

  },300)
},
created(){

   this.sockets.subscribe('login', (data) => {
         console.log(data)
    });//全局注册监听
    this.sockets.subscribe('message', (data) => {
         console.log(data)
         this.chatList.push(data)
         this.$nextTick(()=>{
          this.$refs.chatBoard.toBottom()
        })
        //  this.refs.chatBoard.toBottom()
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
  set(){

    this.$emit('destory')
  },
  touchStart(e){
    // console.log(e)
  },
  send(val){
        this.chatList.push( {from:this.user,value:this.value,to:this.to}  )
        console.log(this.to)
        this.$nextTick(()=>{
          this.$refs.chatBoard.toBottom()
        })
          this.$socket.emit('send', {from:this.user,value:this.value,to:this.to})
  },
  getData(val){
      this.value=val
  }
},

}
</script>
<style lang="scss">
  .talk{
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 99;
    display: flex;
    flex-direction: column;
    flex:1;
    background-color: #eeeeee;
  }
</style>
