<template>
  <div>
     <div v-for="(item,index) in frendList" :key="index" @click="goChat(item)">{{item.name}}</div>
  </div>
</template>
<script>
export default {
      data(){
        return{
           chatterList:[]
        }
      },
      computed:{
         frendList(){
           return this.$store.getters.friendList
         }
      },
      methods:{
        goChat(val){
           this.$store.dispatch('goSetChatList',{chatter:[val],isRecv:false,from:this.$store.state.loginUser,isGroup:false})
           console.log(this.$store.state)
           this.$store.state.friendList.forEach(item=>{
               if(item.chatId==val.chatId){
                 this.$store.dispatch('gosetCurrentId',item.chatId)
               }
           })
            this.$emit('goChat',{fromUser:true,chatter:[val]})
        }
      },
}
</script>
<style>

</style>
