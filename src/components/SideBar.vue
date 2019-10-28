<template>
  <nav class="sidebar">
    <img id="clsimg" alt="Lands logo" src="../assets/logo.png">
    <p class="sidetitle">User Management Tools</p>
    <ul class="listbdy">
      <li :key="item.id" v-for="item in mnus">
        <router-link :to="item.link">{{ item.mnu }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'SideBar',
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
<style scoped lang="stylus">

  light = #e2f6ff
  dark = #b0c3cc
  corp = #002566

  .sidebar
    position fixed
    top 0
    left 0
    height 100%
    width 180px
    padding-top 35px
    background-color light
    box-shadow 1px 0 0 rgba(0,0,0,.3)
    z-index 100

  .sidetitle
    font-size 0.9rem
    font-weight bold
    color corp
  
  #clsimg
    margin-top 20px
    width 75%
    height auto

  .listbdy
    color corp
    font-weight bold
    margin-top 10px
    li
      border-bottom 1px solid dark
      line-height 50px
      cursor pointer
      a
        display inline-block
        width 100%
        height 100%
        color #333
        font-size 1.1rem
        letter-spacing 1px
        text-decoration: none
</style>