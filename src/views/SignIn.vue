<template>
  <div class="signin">
    <div class="box container" style="max-width:500px;">
      <h1 class="title">SIGN IN</h1>
      <p :class="{ red : hasError }">{{ msg }}</p>
      <div class="field">
        <label class="label">ユーザー名</label>
        <div class="control">
          <input class="input" type="text" v-model="id">
        </div>
      </div>
      <div class="field">
        <label class="label">パスワード</label>
        <div class="control">
          <input class="input" type="password" v-model="pw">
        </div>
      </div>
      <button class="button is-info" @click="signin">サインイン</button>
    </div>
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
.red
  color : #F00
</style>
