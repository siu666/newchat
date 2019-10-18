function addListen(){
  let startX,moveX,endX
  document.getElementById("talk").style.transform='translate3d(0,0,0)'
  document.getElementById("talk").addEventListener('touchstart',(e)=>{
        console.log(e)
  },false)
  document.getElementById("talk").addEventListener('touchmove',(e)=>{
    document.getElementById("talk").style.transform='translate3d('+e.touches[0].clientX+'px,0,0)'
},false)
document.getElementById("talk").addEventListener('touchEnd',(e)=>{
  console.log(e)
},false)
}

  export { //很关键
    addListen
  }
