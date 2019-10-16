<template>
    <div>
        <input-box v-bind="$attrs" v-on="$listeners"></input-box>  
    </div>
</template>
<script>
import inputBox from './inputBox'

export default {
    components:{
        inputBox
    },
    data(){
        return{
           value:''
        }
    },
    methods:{
      onput(val){
          this.$emit('getData',this.value)
      }  
    },
}
</script>
<style lang="scss">

</style>