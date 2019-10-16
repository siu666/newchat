<template>
  <div class="nav">
      <div class="userInfo">
           {{username}}
      </div>
      <div class="chatList"></div>
  </div>
</template>
<script>
export default {
   data(){
     return{

     }
   },
   created(){
   },
   props:{
     username:{
       type:String,
       default:""
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
