<template>
  <div class="chatComp">
     <div v-for="(item,index) in allChat"  :key="index" @click="clickTo(item)"><span v-for="(item1,index) in item.chatter" :key="index">{{item1.userId}}</span>
     {{'('+item.chatId+')'}}</div>
  </div>
</template>
<script>
export default {
  props:{
    allChat:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
    data(){
      return{
        list:[]
      }
    },
    methods:{
      clickTo(val){
          this.$store.dispatch('gosetCurrentId',val.chatId)
          this.$emit('goChat',{chatId:val.chatId,chatter:val.chatter,fromUser:true})
    }
    },
}
</script>
<style>

</style>
