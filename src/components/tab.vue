<template>
     <div class="tabbar">

            <span v-for="(item,index) in list" :key="index" @click="changeItem(index)">
              {{item.name}}
            </span>

     </div>
</template>
<script>
export default {
    data(){
        return{
             list:[{name:'Chat'},{name:'User'},{name:'My'}]
        }
    },
    methods:{
      changeItem(val){
          this.$emit('input',val)
      }
    },
    mounted(){

      // var div=document.createElement("DIV");
      // div.className='blank';//
      //  document.getElementById("chat").appendChild(div);
    },
    created(){

// div.innerText = "abc";
//       document.body.appendChild(div);
    }
}
</script>
<style lang="scss">
.blank{
  position: relative;
  width: 100%;
  height: 1rem;
}
    .tabbar{
      z-index: 99;
        position: fixed;
        bottom:0;
        left:0;
        width: 100%;
        height: 1rem;
  background-color:#2e3238;
  display: flex;
  justify-content: space-around;
    span{
      font-size: .18rem;
    }

    }
</style>
