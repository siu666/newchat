<template>
    <div class="chatter">{{to}}</div>
</template>
<script>
export default {
      data(){
          return{
              chatter:'123'
          }
      },
      props:{
          to:{
              type:String,
              default:''
          }
      },
}
</script>
<style lang="scss">
  .chatter{
      width: 100%;


      height: 0.6rem
  }
</style>
