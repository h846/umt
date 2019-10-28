<template>
  <div id="app">
    <div v-if="isSignIned">
      <myheader title='ユーザー管理ツール'/>
      <sidebar/>
    </div>
    <transition mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
import SideBar from './components/SideBar'

export default {
  name: 'App',
  components: {
    myheader: MyHeader,
    sidebar: SideBar
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
      if(isSignIn == true || isSignIn == false){
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
  padding-left: 180px;
  background-color: #FFF;
</style>