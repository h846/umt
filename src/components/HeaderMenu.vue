<template class="container">
  <nav class="menubar columns">

    <img id="logo" class="column" alt="Lands logo" src="../assets/logo.png">

    <div class="column">
      <ul class="listbdy columns">
        <li :key="item.id" v-for="item in mnus" class="column">
          <router-link :to="item.link">{{ item.mnu }}</router-link>
        </li>
      </ul>
    </div>

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

  *
    margin 0
    padding 0
    outline none 
    border 0

  .menubar
    position fixed
    top 0
    left 0
    height 100px
    width 100%
    padding 20px
    background-color #FFF
    box-shadow 0 5px 10px -6px rgba(0,0,0,.3)
    z-index 100

    #logo
      width 30px
      height 30px

    .listbdy
      color corp
      height 100px
      font-weight bold
      li
        height autox
        cursor pointer
        padding 0
        width
        a
          display inline-block
          position relative
          width 100%
          height 100%
          color #333
          font-size 1.1rem
          letter-spacing 1px
          text-decoration: none
          &::after
            background-color: tomato;
            left 50%
            bottom 0
            content ''
            display block
            height 10px
            position absolute
            transition .2s all
            width 0
          &:hover
            &::after
              left 0
              width: 100px
</style>