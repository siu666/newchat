<template>
    <div class="inputBox">
          <textarea v-model="value" @input="onput" >
                
          </textarea>
          <button @click="send">send</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
           value:''
        }
    },
    methods:{
        send(){
            
            this.$emit('send',this.value)
        },
        // onBlur(){},
      onput(val){
          this.$emit('getData',this.value)
      }  
    },
}
</script>
<style lang="scss">
.inputBox{
textarea{
    background-color: #eeeeee;
    height: 100px;
    width: 100%;
    resize: none;
    // border:none;
    border:0;
    outline:none;
}
}

</style>