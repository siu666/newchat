<template>
    <div class="chatBoard">
       <p><span v-for="(item,index) in chatList" :key="index">{{item.value}}</span></p>
    </div>
</template>
<script>
export default {
    data(){
        return{
       
        }
    },
    props:{
        chatList:{
            type:Array,
            default:function(){
                return []
            }
        }
    }
}
</script>
<style lang="scss">
.chatBoard{
    background-color: #ffffff;
    overflow: scroll;
    flex:1;
}

</style>