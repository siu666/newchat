<template>
    <div class="chatter" @click="close"><span v-for="(item,index) in chatter" :key="index">{{item.userId}}</span>
     <el-button v-if="isGroup" @click="exitGroup">退出</el-button>
    </div>
</template>
<script>
export default {
      data(){
          return{

          }
      },
      props:{
        isGroup:{
          type:Boolean,
          default:false,
        },
          chatter:{
              type:Array,
              default:()=>{
                return []
              }
          }
      },
      methods:{
        exitGroup(){
            this.$socket.emit('send',{chatter:this.chatter,chatId:this.$store.state.currentChatId,RemoveUser:this.$store.state.loginUser,ExitGroup:true})
            this.$emit('close')
            this.$store.dispatch('goDeleteChatList',{chatId:this.$store.state.currentChatId})

        },
        close(){
          this.$emit('close')
        }
      },
}
</script>
<style lang="scss">
  .chatter{
      font-weight: bold;
      text-align: center;
      line-height: 0.8rem;
      width: 100%;


      height: 0.8rem
  }
</style>
