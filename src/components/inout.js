function addListen(Fn){
  let startX,moveX,endX
  let destory=false
  document.getElementById("talk").style.transform='translate3d(0px,0,0)'
  document.getElementById("talk").addEventListener('touchstart',(e)=>{
    document.getElementById("talk").style.transition=''
        startX=e.changedTouches[0].pageX
  },false)
  document.getElementById("talk").addEventListener('touchmove',(e)=>{
    if(startX<50){
      document.getElementById("talk").style.transform='translate3d('+e.touches[0].clientX+'px,0,0)'
    }

},false)
document.getElementById("talk").addEventListener('touchend',(e)=>{
  if(e.changedTouches[0].pageX>200){
    destory=true
    document.getElementById("talk").style.transition='0.2s'
    document.getElementById("talk").style.transform='translate3d(7.5rem,0,0)'
  }else{
    destory=false
    document.getElementById("talk").style.transition='0.2s'
    document.getElementById("talk").style.transform='translate3d(0,0,0)'
  }

      // setTimeout(()=>{
      //   Fn();
      // })
},false)
document.getElementById("talk").addEventListener('transitionend',()=>{
  document.getElementById("talk").style.transition=''
  if(destory){
    Fn()
  }

},false)
}

  export { //很关键
    addListen
  }
