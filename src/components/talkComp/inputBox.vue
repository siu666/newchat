<template>
    <div class="inputBox">
          <textarea class="tarea" v-model="value" @input="onput" @keydown="keyDw" :autofocus="true">

          </textarea>
         <div class="bottom"><span class="tips">Ctrl+Enter换行</span><el-button @click.native="send">发送</el-button></div>
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
      keyDw(e){
        console.log()
        if(e.keyCode=='13'&&e.ctrlKey){
                      this.value+='\n'
        }
        if(e.keyCode=='13'&&!e.ctrlKey){
          this.$emit('send',this.value)
                      this.value=''
        }
      },
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
    font-size: 16px;
    padding-left:18px;
}
.tarea{
   border-top:1px solid #d6d6d6;
  //  margin-right: 12px;
  //  width: calc(100vw - 32px)
}
.bottom{
  text-align: right;
  .tips{
    font-size: 16px;
    color:#d6d6d6
  }
}

}

</style>
