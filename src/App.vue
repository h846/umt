<template>
  <div id="app">
    <headermenu v-if="isSignIned" />
    <transition mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import HeaderMenu from './components/HeaderMenu'

export default {
  name: 'App',
  components: {
    headermenu: HeaderMenu
  },
  data(){
    return {
      msg: 'Hello',
      isSignIned: false
    }
  },
  methods: {
    fetchData(){
      var isSignIn = this.$route.params.SignIn;
      if(isSignIn == true || isSignIn == false){//except undefined
        this.isSignIned = this.$route.params.SignIn;
      }
      
    }
  },
  watch: {
    //run fetchData when $route is changed
    '$route': 'fetchData'
  },
  mounted: function(){

    if(!this.$cookies.isKey('umtpassword')){
      this.$router.push('signin')
    }else{
      this.isSignIned = true
    }
  }
}
</script>

<style lang="sass">
@import url("https://fonts.googleapis.com/css?family=Sawarabi+Gothic");
@import "../node_modules/bulma/bulma.sass";

.v-enter-active, .v-leave-active 
  transition: opacity .1s;

.v-enter, .v-leave-to
  opacity: 0;

*
  margin: 0
  padding: 0
  border: 0
  outline: none

#app
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Sawarabi Gothic";
  text-align: center;
  color: #2c3e50;
  padding-top: 50px;
  background-color: #FFF;
</style>