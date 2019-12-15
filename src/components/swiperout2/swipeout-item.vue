

<template>
  <div class="vux-swipeout-item"
  @touchstart="start"
  @mousedown="start"
  @touchmove="move"
  @mousemove="move"
  @touchend="end"
  @mouseup="end"
  @touchcancel="end">
    <div class="vux-swipeout-button-box vux-swipeout-button-box-left" :style="leftButtonBoxStyle" v-show="distX >= 0">
      <slot name="left-menu"></slot>
    </div>
    <div class="vux-swipeout-button-box" :style="buttonStyle" v-show="distX <= 0">
      <slot name="right-menu"></slot>
    </div>
    <div class="vux-swipeout-content" :style="styles" @mousedown="onContentClick" @touchstart="onContentClick" ref="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swipeout-item',
  props: {
    currentClick:{
       type:String,
       default:''
    },
    sensitivity: {
      type: Number,
      default: 0
    },
    autoCloseOnButtonClick: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    threshold: {
      type: Number,
      default: 0.3
    },
    underlayColor: String,
    transitionMode: {
      type: String,
      default: 'reveal'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.render()
    })
  },
  methods: {
    render () {
      
      this.target = this.$refs.content
      if (this.$slots['left-menu']) {
        this.hasLeftMenu = true
        this.caculateMenuWidth('left')
      }
      if (this.$slots['right-menu']) {
        this.hasRightMenu = true
        this.caculateMenuWidth('right')
      }
    },
    caculateMenuWidth (direction) {
      const list = this.$slots[`${direction}-menu`][0].children.filter(one => one.tag)
      let width = 0
      list.forEach(one => {
        const propsData = one.componentOptions ? one.componentOptions.propsData : {}
        width += propsData.width || 80
      })
      this[`${direction}MenuWidth`] = width
    },
    onContentClick () {
      // if (this.styles.transform.indexOf('(0px, 0, 0)') === -1) {
      //   this._setClose(200)
      // }
    },
    onItemClick () {
      if (this.autoCloseOnButtonClick) {
        this._setClose()
      }
    },

    start (ev) {
       let resetItem= this.$parent.$children.filter(item=>item._uid!=this._uid&&item.isOpen);
        //  resetItem.forEach((item,index)=>{
        //       item.setOffset(0,true,index)
        //  })
        // this.target.classList.remove('vux-swipeout-content-animated')
        if(!this.target.style['transform']){
            this.target.style['transform']='translate3d(0px,0,0)';
        };
        this.pageX=ev.touches[0].pageX
    },
    move (ev) {
        let moveX=ev.touches[0].pageX;
        this.distX=moveX-this.pageX;
        
        this.setOffset(this.distX)
    },
   
    end (ev) {
                const threshold = this.threshold <= 1 ? this.rightMenuWidth * this.threshold : this.threshold

          if (this.distX < -threshold) {
            this.setOffset(-this.rightMenuWidth, true)
            this.$emit('on-open')
            this.isOpen = true
          } else {
            this._setClose()
          }
    },
     setOffset(x,animated=false,resetIndex=-1){
      //  if(Number(x)>0){
      //     x=0;
      //  }

        if(animated){
          this.closeX=x;
          var distX=this.distX;
          let _this=this
          this.timer=setInterval(()=>{
            return (function(){
                if(_this.isOpen){
                 distX--;
                 console.log('disX'+distX)
                 console.log("x:"+x)
                if(distX<x){
                  console.log(distX)
                  distX=x
                }
                _this.target.style['transform']=`translate3d(${_this.distX}px,0,0)`;
                if(distX=x){
                    clearInterval(_this.timer)
                    _this.timer=null
                }
                }else{
                _this.closeX++;
                if(_this.closeX>0){
                  _this.closeX=0
                }
                _this.target.style['transform']=`translate3d(${_this.closeX}px,0,0)`;
                if(_this.closeX==0){
                    clearInterval(_this.timer)
                    _this.timer=null
                }
                }
                
            })()
           
          },1)
        //  var timer= setInterval(()=>{
               
        //   },16.7)
        //   this.target.classList.add('vux-swipeout-content-animated');
        //     var cb = (function (self, target) {
        //   return function () {
        //     console.log()
           
        //     target.classList.remove('vux-swipeout-content-animated')
        //     self.isAnimated = false;
        //     if(resetIndex>0){
        //       target.style={}
        //     }
        //     self.buttonStyle={}
        //     target.removeEventListener('webkitTransitionEnd', cb)
        //     target.removeEventListener('transitionend', cb)
        //   }
        // })(this, this.target)
        // this.target.addEventListener('webkitTransitionEnd', cb)
        // this.target.addEventListener('transitionend', cb)
             return 
        }
        
         this.target.style['transform']=`translate3d(${this.closeX+x}px,0,0)`
    },
    _setClose (delay = 0) {
      this.setOffset(this.distX, true)
      this.$emit('on-close')
      if (!delay) {
        this.isOpen = false
      } else {
        setTimeout(() => {
          this.isOpen = false
        }, delay)
      }
      // this.distX = 0
    },
    open (position = 'right') {
      this.setOffset(position === 'right' ? -this.rightMenuWidth : this.leftMenuWidth, true, true)
    },
    close () {
      this.setOffset(0, true, true)
    }
  },
  computed: {
    menuWidth () {
      if (!this.hasLeftMenu && this.hasRightMenu) {
        return this.rightMenuWidth
      }
      if (this.hasLeftMenu && !this.hasRightMenu) {
        return this.leftMenuWidth
      }
      if (this.hasLeftMenu && this.hasRightMenu) {
        return this.distX < 0 ? this.rightMenuWidth : this.leftMenuWidth
      }
    },
    buttonBoxStyle () {
      return {
        backgroundColor: this.underlayColor
      }
    },
    leftButtonBoxStyle () {
      let styles = JSON.parse(JSON.stringify(this.buttonBoxStyle))
      if (this.transitionMode === 'follow'&&this.$parent.$children['transform']) {
        let offset = this.styles.transform.indexOf('(0px, 0, 0)') === -1 ? this.leftMenuWidth - this.distX : this.leftMenuWidth
        styles.transform = `translate3d(-${offset}px, 0, 0)`
      }
      return styles
    },
    rightButtonBoxStyle () {
      let styles = JSON.parse(JSON.stringify(this.buttonBoxStyle))
      if (this.transitionMode === 'follow'&&this.currentItem.styles['transform']) {

        let offset = this.currentItem.styles.transform.indexOf('(0px, 0, 0)') === -1 ? this.rightMenuWidth - Math.abs(this.distX) : this.rightMenuWidth
        if (offset < 0) {
          offset = 0
        }
        if (this.isAnimated) {
          styles.transition = 'transform 0.2s'
        }

        styles.transform = `translate3d(${offset}px, 0, 0)`;
      }
      return styles
    }
  },
  data () {
    return {
      closeX:0,
      timer:null,
      lastIndex:0,
      pageX: undefined,
      pageY: undefined,
      distX: 0,
      distY: 0,
      hasLeftMenu: false,
      hasRightMenu: false,
      animated: false,
      isAnimated: false,
      isOpen: false,
      currentItem:{},
      buttonStyle:{

      },
      styles: {
        // transform: 'translate3d(0px, 0, 0)'
      },
      direction: '',
      leftMenuWidth: 160,
      rightMenuWidth: 160
    }
  },
  watch: {
    disabled (newVal, oldVal) {
      if (newVal === true && !oldVal) {
        this.setOffset(0, true, true)
      }
    }
  }
}
</script>
