<template>
  <div class="chatComp">
     <div v-for="(item,index) in list"  :key="index" @click="clickTo(item)">{{item.name}}</div>
  </div>
</template>
<script>
export default {
    data(){
      return{
        list:[{name:"123"},{name:"234"}]
      }
    },
    methods:{
clickTo(val){
  console.log(val)
   this.$emit('goChat',val)
}
    },
}
</script>
<style>

</style>
