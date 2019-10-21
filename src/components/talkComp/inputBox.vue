<template>
    <div class="inputBox" ref="box" :style="{height:height+'px',transition:'0.2s'}">
          <!-- <textarea ref="textarea" class="tarea" :style="{height:height+'rem'}"  v-model="value" @input="onput" @keydown="keyDw" :autofocus="true" @scroll="rowScroll">

          </textarea> -->
          <el-input
          :style="{marginBottom:marginBottom}"
          ref='textArea'
  type="textarea"
  autosize
  placeholder="请输入内容"
  v-model="textarea1">
</el-input>
         <!-- <div class="bottom"><span class="tips">Ctrl+Enter换行</span><el-button @click.native="send">发送</el-button></div> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
           textarea1:'',
           heightArray:[],
           height:'0',
           marginBottom:'',
        }
    },
    computed:{
       
    },
    watch:{
      textarea1(){
           let height=this.$refs.textArea.$refs.textarea.offsetHeight+5

           this.height=height;
           this.$emit('setHeight',height)
          //  this.marginBottom=-this.$refs.textArea.$refs.textarea.offsetHeight/2+'px'

          // this.height=this.$refs.textArea.$refs.textarea.offsetHeight+this.$refs.box.offsetHeight
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.height=this.$refs.textArea.$refs.textarea.offsetHeight+5;
        this.$emit('setHeight',this.height)
        // console.log(this.$refs.textArea)
        // this.marginBottom=-this.$refs.textArea.$refs.textarea.offsetHeight/2+'px'
      })
        
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
  background-color: red;
  display: flex;
  align-items: center;
  // height: 40px;
  // display: flex;
  // align-items: center;
  .el-textarea{
    // padding: 10px 0;
    // position:absolute;
    // bottom: 50%;
textarea{
    
    // position:absolute;
    // bottom:0px;
      border-radius: 0.15rem;
    width: 7rem;
    background-color: #ffffff;
    // height: 100px;
    // line-height: 1;
    // height: 0.28rem;
    // font-size: 0.5rem;
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
