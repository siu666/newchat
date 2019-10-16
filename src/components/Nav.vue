<template>
  <div class="nav">
      <div class="userInfo">
           {{username}}
      </div>
      <div class="chatList">
       <div v-for="(item,index) in arr" :key="index" @click="goChat(item)">{{item}}</div>
      </div>
  </div>
</template>
<script>
export default {
   data(){
     return{
     arr:['123','234']
     }
   },
   
   props:{
     username:{
       type:String,
       default:""
     }
   },
   created(){
   },
   methods:{
         goChat(item){
           this.$emit('goChat',item)
         }
   }
}
</script>
<style lang="scss">
.nav{
  // flex:1;
  // height: 100vh;
  width: 300px;
  background-color:#ffffff;
}

</style>
