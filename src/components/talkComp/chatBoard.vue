<template>
    <div class="chatBoard" ref="chatBoard">
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
