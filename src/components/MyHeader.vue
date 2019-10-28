<template>
  <div class="header">
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .header
    position fixed
    top 0
    left 0
    width 100%
    height 25px
    line-height 25px
    text-align left
    padding-left 10px
    background-color #FFF
    box-shadow 0 3px 3px -3px rgba(0,0,0,.3)
    z-index 1000
</style>