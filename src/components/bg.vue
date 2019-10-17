<template>
   <div class="bg"></div>
</template>
<script>

export default {

   data(){
     return{

     }
   },
}
</script>
<style lang="scss">
.bg{
        width:100%;
        height: 100vh;
          background-image: url('../../static/timg.jpg');
background-repeat:no-repeat;
background-size:cover;
-webkit-filter:blur(15px);
-moz-filter:blur(15px);
-o-filter:blur(15px);
-ms-filter:blur(15px);
filter:blur(15px);
position:absolute;
left:0;
top:0;
      }
</style>
