<template>
    <div>
        <swipeout>
            <swipeout-button slot="right-menu">123</swipeout-button>
            <swipeout-item>
                <div slot="content" style="color:blue;height:50px">
                    123
                </div>
            </swipeout-item>
            <swipeout-item>
                <div slot="content" style="color:blue;height:50px">
                    123
                </div>
            </swipeout-item>
            <swipeout-item>
                <div slot="content" style="color:blue;height:50px">
                    123
                </div>
            </swipeout-item>
        </swipeout>
    </div>
</template>
<script>
import Swipeout from '../components/swiperout2/swipeout'
import SwipeoutItem from '../components/swiperout2/swipeout-item'
import SwipeoutButton from '../components/swiperout2/swipeout-button' 
export default {
     components:{
         Swipeout,
         SwipeoutItem,
         SwipeoutButton
     }
}
</script>
<style>
</style>