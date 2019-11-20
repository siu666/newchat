import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
function random(){
  let num=''
    for(var i=0;i<6;i++){
         num=String(num)+String(parseInt(Math.random()*10))
    }
    return num
}
function setId(obj){
    let arr=[];
    let id="";
    obj.chatter.forEach(item=>{
        arr.push(item.userId)
    });
    arr.push(obj.from.userId);
    arr=arr.sort()
    arr.forEach(item=>{
        id+=item
    })
    return id
}
const state={
    currentChatId:'',
    chatList:[],
    loginUser:{},
    friendList:[{name:"123",chatId:"",userId:"A1"},{name:"234",chatId:"",userId:"B2"},{name:"345",chatId:"",userId:"C3"},{name:"456",chatId:"",userId:"D4"}]

}
const getters={
  currentChatId(){
    return state.currentChatId
  },
    chatLists(state){
        return state.chatList
    },
    userInfo(state){
      return state.loginUser
    },
    friendList(state){
      return state.friendList
    }
}
const mutations={

      setcurrentChatId(state,id){
           state.currentChatId=id
      },
      setFriendList(state,chatId){
           state.friendList.forEach(item=>{
               item.chatId=chatId
           })
      },
      setLogin(state,data){
         state.loginUser=data
      },
      deleteChat(state,data){
         state.chatList.forEach((item,index)=>{
             if(item.chatId==data.chatId){
                 state.currentChatId=''
                 state.chatList.splice(index,1)
             }
         })
      },
      setChatList(state,data){
        data.time=new Date().getTime();
        if(data.isGroup){
          let id=new Date().getTime()+random();

          if(!data.isRecv){
            //主动发群聊
            if(!state.chatList.length){
              //如果是初始化未有聊天记录
             state.chatList.push({
               chatId:id,
               chatter:data.chatter,
               chatList:[],
               isGroup:data.isGroup
              })
              state.currentChatId=id
            }else{

               for(var i=0;i<state.chatList.length;i++){
                      if(data.chatId==state.chatList[i].chatId){
                             state.chatList[i].chatList.unshift(data)
                             return
                      }
               }
               state.chatList.push({
                chatId:id,
                chatter:data.chatter,
                chatList:data['value']!=undefined&&data.value!=''?[data]:[],
                isGroup:data.isGroup
               })

               state.currentChatId=id
            }
          }else{
            let chatter=[];
            chatter=data.chatter.filter(item=>{
               return item.userId!=state.loginUser.userId
            })
            chatter.push(data.from)
            if(!state.chatList.length){
              //如果是初始化未有聊天记录
             state.chatList.push({
               chatId:data.chatId,
               chatter:chatter,
               chatList:[data],
               isGroup:data.isGroup
              })
              state.currentChatId=id
            }else{

               for(var i=0;i<state.chatList.length;i++){
                      if(data.chatId==state.chatList[i].chatId){
                             state.chatList[i].chatList.unshift(data)
                             return
                      }
               }
               state.chatList.push({
                chatId:data.chatId,
                chatter:chatter,
                chatList:data['value']!=undefined&&data.value!=''?[data]:[],
                isGroup:data.isGroup
               })

               state.currentChatId=id
            }
          }

        }else{
          let id =setId(data)
          //单人聊天
          if(!data.isRecv){
            //创建或者是插入聊天记录
             if(!state.chatList.length){
               //如果是初始化未有聊天记录
              state.chatList.push({
                chatId:id,
                chatter:data.chatter,
                chatList:[],
                isGroup:data.isGroup
               })

                 //再让与朋友的聊天id同时赋值
                state.friendList.forEach(item=>{
                    if(item.userId==data.chatter[0].userId){
                      item.chatId=id
                    }
                })

             }else{
                let checkExist=state.chatList.filter(item=>{
                return data.chatter[0].chatId.indexOf(item.chatId)>-1
                });
                if(!checkExist.length){
                  state.chatList.push({
                    chatId:id,
                    chatter:data.chatter,
                    chatList:[],
                    isGroup:data.isGroup
                   })

                    //再让与朋友的聊天id同时赋值
                   state.friendList.forEach(item=>{
                       if(item.userId==data.chatter[0].userId){
                         item.chatId=id
                       }
                   })

                }


               //当初始化过后判断是否是已存在
               state.chatList.forEach(item=>{
                      //之前存在的chatId已有
                      if(data.chatter[0].chatId==item.chatId&&data.value&&data['value']!=undefined){
                           item.chatList.unshift(data)

                      }
               })
             }
          }else{
            data.from.chatId=data.chatId
            //信息接收时
            if(!state.chatList.length){

              //如果是初始化未有聊天记录
             state.chatList.push({
               chatId:data.chatId,
               chatter:[data.from],
               chatList:[data],
               isGroup:data.isGroup
              })

                //再让与朋友的聊天id同时赋值
               state.friendList.forEach(item=>{
                   if(item.userId==data.from.userId){
                     item.chatId=id
                   }
               })

          }else{

            let checkExist=state.chatList.filter(item=>{
              return data.chatId.indexOf(item.chatId)>-1
              });
              if(!checkExist.length){
                state.chatList.push({
                  chatId:data.chatId,
                  chatter:[data.from],
                  chatList:[data],
                  isGroup:data.isGroup
                 })
                 return
              }
              state.chatList.map(item=>{
                //之前存在的chatId已有
                if(item.chatId==data.chatId){

                     data.value&&data['value']!=undefined?item.chatList.unshift(data):''

                }
         })
          }
        }
        }

      }
}
const actions={
    gosetCurrentId(context,id){
        context.commit('setcurrentChatId',id)
    },
    goSetChatList(context,data){
         context.commit('setChatList',data)
    },
    goDeleteChatList(context,data){
      context.commit('deleteChat',data)
 },
    gosetLogin(context,data){
        context.commit('setLogin',data)
    },
    goSetFriendList(context,data){
         context.commit('setFriendList',data)
    },
}
const store = new Vuex.Store(
  {
    state,
    getters,
    actions,
    mutations
  }

);

export default store;
