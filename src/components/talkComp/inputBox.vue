<template>
    <div class="inputBox">
          <textarea ref="textarea" class="tarea" :style="{height:height+'rem'}"  v-model="value" @input="onput" @keydown="keyDw" :autofocus="true" @scroll="rowScroll">

          </textarea>
         <!-- <div class="bottom"><span class="tips">Ctrl+Enter换行</span><el-button @click.native="send">发送</el-button></div> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
           value:'',
           height:0.5
        }
    },
    methods:{
      rowScroll(e){

      },
      keyDw(e){
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
        //  console.log(this.$refs.textarea)
        // this.height=(this.$refs.textarea.scrollHeight/100)


          this.$emit('getData',this.value)
      }
    },
}
</script>
<style lang="scss">
.inputBox{
  position: fixed;
  bottom:0;
  left: 0;
  width:100%;
  background-color: #ffffff;
  height: 40px;
  // display: flex;
  // align-items: center;
textarea{
    position:absolute;
    bottom:0px;
      border: 1px solid black;
      border-radius: 0.15rem;
    width: 7rem;
    background-color: #ffffff;
    // height: 100px;
    // line-height: 1;
    // height: 0.28rem;
    font-size: 0.5rem;
    // width: 100%;
    resize: none;
    // border:none;
    // border:0;
    outline:none;
    padding:0 0.3rem 0 0.1rem;
    // padding-top: 0.05rem;
    // padding-left:0.1rem;
    box-sizing: border-box;
}
.tarea{
  //  border-top:1px solid #d6d6d6;
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
