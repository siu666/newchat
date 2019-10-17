<template>
     <div class="tabbar">
          <div v-for="(item,index) in list" :key="index">
              {{item.name}}
          </div>
     </div>
</template>
<script>
export default {
    daata(){
        return{
             list:[{name:'Chat'},{name:'User'},{name:'My'}]
        }
    }
}
</script>
<style lang="scss">
    .tabbar{
        position: fixed;
        bottom:0;
        left:0;
        width: 100%;
        height: 1.5rem;
  background-color:#2e3238;
        
    }
</style>