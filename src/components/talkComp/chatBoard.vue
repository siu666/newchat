<template>

    <div class="chatBoard" ref="chatBoard" :style="{height:height}">
      <better-scroll ref="scroll" @scroll="scroll">
                        <div class="content" v-for="(item,index) in chatList" :key="index">
                                                   <p v-if="item.type=='string'" :class="[item.from==user?'ItemUser':'ItemChatter']"><span class="item clearfix">{{item.value}}</span></p>
                                                   <div v-if="item.type=='photo'"  :class="[item.from==user?'ItemUser':'ItemChatter']"   ><img :preview="index" :src="item.value" /></div>
                        </div>



      </better-scroll>
    </div>
</template>
<script>
import betterScroll from '../scroll/betterScroll'
export default {
  components:{
    betterScroll
  },
    data(){
        return{

        }
    },
    props:{
        cut:{
            type:Number,
            default:0
        },
        user:{
          type:Object,
          default:{}
        },
        chatList:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    computed:{
        height(){
            return `calc(100vh - ${this.cut}px)`
        }
    },
    mounted(){
      // setTimeout(()=>{
      // this.toBottom();

      // },300)
      //  this.toBottom();
    },
    methods:{
      scroll(e){
        console.log(e)
      },
       toBottom(){
         setTimeout(()=>{
         this.$nextTick(()=>{
           this.$previewRefresh()
             this.$refs.scroll.refresh();
             this.$refs.scroll.scrollTo(0,this.$refs.scroll.scroll.maxScrollY,200)

         })
         },21)

       }
    },
}
</script>
<style lang="scss">
.chatBoard{
   .scrollContent{
      // height: inherit;
      .content{
        padding: 0.1rem;
      }
   }
    background-color: #eeeeee;
    // overflow-y: scroll;
    // flex:1;
    .ItemUser{
      margin-right: 0.2rem;
      // padding-top:0.02rem;
     justify-content: flex-end;
     .item{
         background-color: #00FF7F;
       }
    }
     .ItemChatter{
       margin-left: 0.2rem;
       .item{
         background-color: #ffffff;
       }
     }
    .ItemUser,.ItemChatter{
      padding-top:0.3rem;
      display: flex;
        padding-top:0.02rem;
        // max-width: 3.8rem;
        // text-align: right;
        // float: right;
        // justify-content:flex-end;

      // height: 1rem;
      // float: right;
      // text-align: right;
      .item{
        font-size: .32rem;
        max-width: 3.5rem;
        word-break: break-all;
        overflow: hidden;
        border-radius: 0.1rem;
        padding: 0.1rem;
        max-width: 3.5rem;

         display: block;
        //  float:right;

      }
      .clearfix{
        zoom: 1;

      }
      .clearfix::after{

          content:"";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;


      }
    }
}

</style>
