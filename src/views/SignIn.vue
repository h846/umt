<template>
  <div class="signin">
    <form id="signin-form" v-on:submit.prevent>
      <div id="title">
        <p>SIGN IN</p>
      </div>
      <br/>
      <p :class="{ red : hasError }">{{ msg }}</p>
      <input class="inpt" type="text" placeholder="ユーザー名" v-model="id">
      <input class="inpt" type="password" placeholder="パスワード" v-model="pw">
      <button class="btn" @click="signin">サインイン</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'signin',
  components: {
  },
  data(){
    return {
      id: '',
      pw: '',
      msg: '資格情報を入力してください',
      hasError: false
    }
  },
  methods:{
    signin: function(){
      if(this.pw === 'Lands001' && this.id !== ""){
        this.$cookies.set('umtpassword', this.id);
        this.$router.push({name:'home', params: {SignIn: true}})
      }else if(this.id === ""){
        this.msg = 'ユーザー名を入力してください';
        this.hasError = true;
      }else{
        this.msg = 'パスワードが正しくありません';
        this.hasError = true;
      }
    }
  },
  created: function(){
    if(this.$cookies.isKey('umtpassword')){
      this.$router.push({name:'home', params: {SignIn: true}})
    }
  }
}
</script>

<style lang="stylus" scoped>
blue = #2196F3
  *
    margin 0
    padding 0
    border 0
    outline none

  .signin
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    margin 15% auto

  #signin-form
    width 300px
    height 200px
    margin auto
    border-radius 6px
    box-shadow 0 0 15px rgba(0,0,0,.3)

  #title
    background-color blue
    border-radius 6px 6px 0 0
    height: 30px
    line-height 30px
    text-align center
    color #FFF
    letter-spacing 1px

  .inpt
    display block
    margin 0 auto
    margin-top 10px
    height 25px;
    line-height 25px;
    width 65%
    padding-left 10px
    border :1px solid #CCC
    border-radius 3px

  .btn
    display inline-block
    color #FFF
    height 35px
    width 80px
    border-radius 3px
    box-shadow 0 0 2px 1px rgba(0,0,0,.3)
    margin 10px auto
    background-color blue/*背景色*/
    cursor pointer
  &:active
    box-shadow none
  
  .red
    color #ff0000
    font-weight bold
</style>
