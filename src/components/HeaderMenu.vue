<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <img src="../assets/logo.png" width="auto" height="auto">
    </router-link>
  </div>

  <div class="navbar-menu is-active">
    <router-link :to="item.link" class="navbar-item" v-for="item in mnus" :key="item.id">
      {{ item.mnu}}
    </router-link>
  </div>
</nav>
</template>

<script>
export default {
  name: 'HeaderManu',
  props: {
    title: String
  },
  data : function(){
    return {
      mnus : [
          {id:1, mnu: 'TOP', link: '/'},
          {id:2, mnu: 'Users', link: '/userlist'},
          {id:3, mnu: 'Logs', link: '/editlog'},
          {id:4, mnu: 'Links', link: '/links'}
        ]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .navbar
    box-shadow: 0 6px 10px -6px rgba(0,0,0,.3);
</style>