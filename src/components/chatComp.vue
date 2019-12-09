<template>
  <div class="chatComp">
    <swipeout>
      <div v-for="(item,index) in testData" :key="index">
        {{item.index}}
        <swipeout-item v-for="(item1,index1) in item.data" :key="index1" :currentClick="index1+item.index">
           <div slot="right-menu" >
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{'Yes'}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{'Right'}}</swipeout-button>
        </div>
          <div  slot="content" style="height:100px" >
             {{item1.name}}
         </div>
        </swipeout-item>

      </div>

      <!-- <swipeout-item transitionMode="follow" v-for="(item,index) in allChat" :currentClick="index+'A'"  :key="index">
         <div slot="right-menu" >
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{'Yes'}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{'Right'}}</swipeout-button>
        </div>
     <div slot="content" style="height:100px"  @click="clickTo(item)"><span v-for="(item1,index) in item.chatter" :key="index">{{item1.userId}}</span>
     {{'('+item.chatId+')'}}</div>
      </swipeout-item> -->
      <!-- <swipeout-button>123</swipeout-button> -->
     </swipeout>
  </div>

</template>
<script>
import Swipeout from '../components/swiperout/swipeout'
import SwipeoutItem from '../components/swiperout/swipeout-item'
import SwipeoutButton from '../components/swiperout/swipeout-button'
// import swiperout from '../components/swiperout'
export default {
  components:{
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  props:{
    allChat:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
    data(){
      return{
        list:[],
        testData:[{index:"A",data:[{name:"123"}]},{index:"B",data:[{name:"234"}]}]
      }
    },
    methods:{
      clickTo(val){
          this.$store.dispatch('gosetCurrentId',val.chatId)
          this.$emit('goChat',{chatId:val.chatId,chatter:val.chatter,fromUser:true})
    }
    },
}
</script>
<style>

</style>
