<template>
    <div class="inputBox" ref="box" :style="{height:contentheight+'px'}">

          <!-- <textarea ref="textarea" class="tarea" :style="{height:height+'rem'}"  v-model="value" @input="onput" @keydown="keyDw" :autofocus="true" @scroll="rowScroll">

          </textarea> -->
          <div class="send">
            <!-- <div class="text" :style="{'-webkit-user-select':'text'}" @input="change" contenteditable="true"></div> -->
            <!-- <textarea v-model="textarea1" @input="change" ref="textarea" :style="{height:height}"></textarea> -->
            <el-input
          :style="{marginBottom:marginBottom}"
          ref='textArea'
  type="textarea"
  autosize
  placeholder="请输入内容"
  class="tarea"
  @input="oninput"
  @blur="blur"
  v-model="textarea1">

</el-input>
<el-button class="sendButton" type="info" icon="el-icon-message" circle @click="sendMSG"></el-button>
<!-- <img class="photoButton" :src="require('../../../static/photo.jpg')" @click="choosePhoto" /> -->
<input ref="file" type="file"  multiple="multiple" lable="img" class="imgChoose" @change="imgChoose" />
</div>


         <!-- <div class="bottom"><span class="tips">Ctrl+Enter换行</span><el-button @click.native="send">发送</el-button></div> -->
    </div>
</template>
<script>
//  import {} from 'a'
export default {
    data(){
        return{
          value:'',
          files:[],
           textarea1:'',
           heiArr:[],
           height:'.6rem',
           contentheight:'',
           marginBottom:'',
           overType:'scroll'
        }
    },
    computed:{

    },
    watch:{

    },
    mounted(){

      this.$nextTick(()=>{
        // console.log(this.$refs.textarea.scrollHeight)
        // console.log(this.$refs.textarea.offsetHeight)
        this.contentheight=this.$refs.textArea.$refs.textarea.offsetHeight+5

        this.$emit('setHeight',this.contentheight)
        // console.log(this.$refs.textArea)
        // this.marginBottom=-this.$refs.textArea.$refs.textarea.offsetHeight/2+'px'
      })
    } ,
    components:{
      // autoTextarea
    },
    methods:{
     async imgChoose(file){
           
          let fileList = this.$refs.file.files[0];
          console.log(fileList.type.substring(fileList.type.lastIndexOf('.'),fileList.type.length))
  if(fileList.type.indexOf('.')>0&&fileList.type.substring(fileList.type.lastIndexOf('.')+1,fileList.type.length)=='document'){
         alert('2')
  }
  var reader = new FileReader();

  //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
  var AllowImgFileSize = 2100000;
  var imgUrlBase64;
  let _this=this
  if (fileList) {
    //将文件以Data URL形式读入页面
    imgUrlBase64 = reader.readAsDataURL(fileList);
    
    reader.onload =async function (e) {
      //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
      if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
        alert('上传失败，请上传不大于2M的图片！');
        return;
      } else {
        //执行上传操作
        let p1=await _this.getBase64(reader.result);

        _this.$emit('send',{value:reader.result,type:'photo'})
      }
    }
  }
      },
      getBase64(url) {
            let self = this;
            let Img = new Image(),
                dataURL = '';
            Img.src = url;
            return new Promise(function (resolve, reject) {
                Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
                    let canvas = document.createElement("canvas"), //创建canvas元素
                        width = Img.width, //确保canvas的尺寸和图片一样
                        height = Img.height;
                    // 默认将长宽设置为图片的原始长宽，这样在长宽不超过最大长度时就不需要再处理
                    let ratio = width / height,
                        maxLength = 300,
                        newHeight = height,
                        newWidth = width;
                    // 在长宽超过最大长度时，按图片长宽比例等比缩小
                    if (width > maxLength || height > maxLength) {

                        if (width > height) {
                            newWidth = maxLength;
                            newHeight = maxLength / ratio;
                        } else {
                            newWidth = maxLength * ratio;
                            newHeight = maxLength;
                        }
                    }
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    canvas.getContext("2d").drawImage(Img, 0, 0, newWidth, newHeight); //将图片绘制到canvas中
                    dataURL = canvas.toDataURL('image/png', 1); //转换图片为dataURL
                    // console.log(dataURL)
                    console.log(dataURL.length)
                    resolve(dataURL);
                };
            });
        },
      choosePhoto(){
         let cmr = plus.camera.getCamera();
     cmr.captureImage(function(p) {
      plus.io.resolveLocalFileSystemURL(p, function(entry) {
       compressImage(entry.toLocalURL(),entry.name);
      }, function(e) {
       plus.nativeUI.toast("读取拍照文件错误：" + e.message);
      });
     }, function(e) {
     }, {
      filter: 'image'
     });
      },
      oninput(e){
        setTimeout(() => {
            //   this.contentheight=this.$refs.textArea.$refs.textarea.offsetHeight+5
            //  this.$emit('setHeight',this.contentheight)
            this.heiArr.push(this.$refs.textArea.$refs.textarea.offsetHeight);
            if(this.heiArr.length>2){
                this.heiArr.splice(0,1);
                if(this.heiArr[0]!=this.heiArr[1]){
                   this.contentheight=this.heiArr[1]+5;

                  this.$emit('setHeight',this.contentheight)
                }
            }




        }, 1);

            // this.height=this.$refs.textArea.scrollHeight+2+'px'
            // console.log(this.$refs.textarea.scrollHeight)
      },
      blur(){
      },
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
        sendMSG(){
            this.$emit('send',{value:this.textarea1,type:"string"})
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
  background-color: #F5F5F5;
  position: fixed;
  bottom:0;
  left: 0;
  width:100%;
  .imgContent{
    position:absolute;
    top: -3rem;
    left: 0;
    width: 2rem;
    height: 2rem;
    background:red;
  }
  // background-color: red;
  // display: flex;
  // align-items: center;
  // height: 40px;
  // display: flex;
  // align-items: center;
  .send{
     position: relative;
     height: inherit;
     .text{
       position: absolute;
       left: 0;
       padding: 0.1rem;
       box-sizing: border-box;
       width: 3rem;
       max-height: 0.92rem;
      //  height: 0.6rem;
       font-size: .24rem;
       transition: 0.2s;
     }
textarea{
    border:none;
    max-height: 1.5rem;
    overflow-y: visible;
    box-sizing: border-box;
    // transition: 0.3s;
    position:absolute;
    left: 0.3rem;
    bottom:0.05rem;
    // height: 0.4rem;
    font-size: 0.3rem !important;
    // position:absolute;
    // bottom:0px;
      border-radius: 0.2rem;
    width: 6rem;
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
    padding:0.1rem 0.3rem 0.1rem 0.1rem;
    // padding-top: 0.05rem;
    // padding-left:0.1rem;
    box-sizing: border-box;
}


.tarea{
  height: inherit;
  //  border-top:1px solid #d6d6d6;
  //  margin-right: 12px;
  //  width: calc(100vw - 32px)
}
.sendButton{
  right: 0.6rem;
  bottom:0.08rem;
  position:absolute;
  padding: 0.1rem;
}
.imgChoose{
  position: absolute;
  right: 0;
  bottom: 0;
   width: 0.6rem;
   height: 0.6rem;
}
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
