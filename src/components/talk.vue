<template>
    <div class="talk" id="talk"  >
            <chat-header :chatter="chatter" :isGroup="onChatType"  ref="header" @close="set"></chat-header>
            <chat-board :chatList="chatList" :user="user" ref="chatBoard" :cut="cut" ></chat-board>

            <test @getData="getData" @send="send"  @setHeight="setHeight"></test>
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
        //  chatList:[],
         cut:0,
      }
    },
    props:{
      onChatType:{
        type:Boolean,
        default:false
      },
      chatter:{
        type:Array,
        default:()=>{
          return []
        }
      },
      chatList:{
          type:Array,
          default:()=>{
            return []
          }
      },
      to:{
        type:String,
        default:""
      },
      user:{
        type:Object,
        default:{}
      }
    },
components:{
  Test,
  ChatBoard,
  chatHeader
},
mounted(){
  setTimeout(()=>{
  // addListen(this.set);

  },300)
},
created(){

   this.sockets.subscribe('login', (data) => {
    });//全局注册监听
    // this.sockets.subscribe('message', (data) => {
    //      console.log(data)
    //      this.chatList.push(data)
    //      this.$nextTick(()=>{
    //       this.$refs.chatBoard.toBottom()
    //     })
    //     //  this.refs.chatBoard.toBottom()
    // });//全局注册监听
},
 socket:{
      connection(data){
      },
      login(DATA){
      }
  },

methods:{
  set(){

    this.$emit('destory')
  },
  touchStart(e){
    // console.log(e)
  },
  setHeight(val){

      this.cut=Number(val)+Number(this.$refs.header.$el.offsetHeight);

      this.$nextTick(()=>{
          this.$refs.chatBoard.toBottom();
      })
  },
  send(val){
        this.$store.dispatch('goSetChatList',{from:this.user,value:val,chatter:this.chatter,isRecv:false,isGroup:this.chatter.length>1,chatId:this.$store.state.currentChatId})

        // this.chatList.push( {from:this.user,value:val,to:this.to}  )
        this.$nextTick(()=>{
          this.$refs.chatBoard.toBottom()
        })
        this.$socket.emit('send', {from:this.$store.state.loginUser,value:val,chatter:this.chatter,chatId:this.$store.getters.currentChatId})
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
    z-index: 999999;
    display: flex;
    flex-direction: column;
    flex:1;
    background-color: #eeeeee;
  }
</style>
