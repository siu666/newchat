<template>
  <div class="hello">
     <p>当前用户{{user}}</p>
     <input v-model="value" /><button @click="send">发送</button>
     <p v-for="(item,index) in talkList" :key="index"  class="item"><span :style="item.from==user?'float:right':'float:left'">{{item.value}}</span></p>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user:"",
      talkList:[],
      value:""
    }
  },
  created(){
     var location =this.$route.query;//获取浏览器输入地址
     this.user=location.user
    axios.post('/users/get',{ab:'1'}).then(res=>{
         console.log(res)
    })

          this.$socket.emit('enter', {data:this.user})


    // this.$socket.emit('emit_method', {data:"123"})
    this.sockets.subscribe('login', (data) => {
         console.log(data)
    });//全局注册监听
    this.sockets.subscribe('message', (data) => {
         this.talkList.push(data)
    });//全局注册监听
  },

  socket:{
      connection(data){
         console.log(data)
      },
      login(DATA){
        console.log(DATA)
      }
  },
  methods:{
    send(val){
          this.talkList.push( {from:this.user,value:this.value,to:'345'}  )
          this.$socket.emit('send', {from:this.user,value:this.value,to:'345'})
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.item{
   width: 100%;
   display: block;
   height: 30px;
}
</style>
