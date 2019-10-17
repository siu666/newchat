<template>
    <div class="talk">
            <chat-header :to="to"></chat-header>
            <chat-board :chatList="chatList"></chat-board>

      <test @getData="getData" @send="send" ></test>
    </div>
</template>
<script>
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
created(){
   this.sockets.subscribe('login', (data) => {
         console.log(data)
    });//全局注册监听
    this.sockets.subscribe('message', (data) => {
         console.log(data)
         this.chatList.push(data)
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
        this.chatList.push( {from:this.user,value:this.value,to:this.to}  )
        console.log(this.to)
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
    display: flex;
    flex-direction: column;
    flex:1;
    background-color: #eeeeee;
  }
</style>
