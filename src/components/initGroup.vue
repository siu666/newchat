<template>
     <div class="initGroup">
           <div>
                <span v-for="(item,index) in friendList" :key="index" :style="{fontWeight:item.check?'bold':''}" @click="choose(item,index)">{{item.userId}}</span>
                <!-- <el-checkbox-group v-model="checkList">
                 <el-checkbox :label="item.userId" v-for="(item,index) in friendList" :key="index" @change="choose(item)"></el-checkbox>

                </el-checkbox-group> -->
           </div>
           <el-button @click="goChat">确定</el-button>
     </div>
</template>
<script>
export default {
    data(){
        return{
           checkList:[]
        }
    },
    computed:{
        friendList(){
            let arr=[]
            this.$store.getters.friendList.forEach(item=>{
                 item.check=false;
                 arr.push(item)
            })
            // let newList=this.$store.getters.friendList.forEch(item=>{
            //          item.check=false
            // })
            return arr
        }
    },
    watch:{
        checkList(val){
            // console.log(val)
        }
    },
    methods:{
        goChat(){
            let chatter=this.friendList.filter(item=>{
                return item.check
            })
            if(!chatter.length){
                return
            }
            if(chatter.length=='1'){
                console.log(this.$store.state.loginUser)
                this.$store.dispatch('goSetChatList',{chatter:chatter,isRecv:false,from:this.$store.state.loginUser,isGroup:false})
           this.$store.state.friendList.forEach(item=>{
               if(item.chatId==chatter[0].chatId){
                 this.$store.dispatch('gosetCurrentId',item.chatId)
               }
           })
            this.$emit('goChat',{fromUser:true,chatter:chatter,from:chatter[0]})
            return
            }
            this.$store.dispatch('goSetChatList',{chatter:chatter,isGroup:chatter.length>1});
            this.$emit('goChat',{chatter:chatter})
        },
        choose(item){
             item.check=!item.check;
             this.$forceUpdate();

        }
    },
}
</script>
<style>

</style>
