<template>
    <div class="chatBoard" ref="chatBoard" :style="{height:height}">
       <p v-for="(item,index) in chatList" :key="index" :style="{textAlign:item.from==user?'right':'left'}">{{item.value}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        cut:{
            type:Number,
            default:''
        },
        user:{
          type:String,
          default:""
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
      //  this.toBottom();
    },
    methods:{
       toBottom(){
           this.$refs.chatBoard.scrollTop=this.$refs.chatBoard.scrollHeight
       }
    },
}
</script>
<style lang="scss">
.chatBoard{
    background-color: #ffffff;
    overflow-y: scroll;
    flex:1;
}

</style>
