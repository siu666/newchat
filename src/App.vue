<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    window.addEventListener('beforeunload', e => {
// window.localStorage.removeItem(‘userInfo’)
    this.$socket.emit('leave',this.$store.state.loginUser.userId)
});
  }
}
</script>

<style>

</style>
