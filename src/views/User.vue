<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            ユーザー情報編集
          </h1>
          <h2 class="subtitle">
            編集中のID: {{ $route.params.id }}
          </h2>
          <h2 class="subtitle"> Created at : {{ user.created_at }}</h2>
        </div>
      </div>
    </section>

    <div class="container section">

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">氏名 (ローマ字)</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: Hanako Yamada" v-model="user.name">
            </div>
            <p class="help">Name</p>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">ユーザーID</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: hyamada" v-model="user.windows_id">
            </div>
            <p class="help">User ID</p>
          </div>
        </div>
      </div>
      
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">オペレーターID</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: hy" v-model="user.operator_id">
            </div>
            <p class="help">Operator ID</p>  
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">UCCX ID</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: 887XXXX" v-model="user.uccx_id">
            </div>
            <p class="help">UCCX ID</p>  
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">ROLE</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: Role_299138" v-model="user.role">
            </div>
            <p class="help">Role</p> 
          </div>
        </div>
      
        <div class="column">
          <div class="field">
            <label class="label">役職</label>
            <div class="control">
              <input class="input" type="text" placeholder="" v-model="user.job_title">
            </div>
            <p class="help">Job Title</p>  
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">所属</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: Customer Sales - CSR" v-model="user.department">
            </div>
            <p class="help">Department</p> 
          </div>
        </div>
      
        <div class="column">
          <div class="field">
            <label class="label">備考</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-model="user.remarks">
            </div>
            <p class="help">Remarks</p>  
          </div>
        </div>
      </div>

      <transition name="fade">
        <p v-if="done" class="has-text-centered" style="color:red">{{ msg }}</p>
      </transition>
      <br>
      <!--button-->
      <div class="buttons">
        <button class="button is-link" @click="update_db()">更新 -UPDATE-</button>
        <button class="button is-info" @click="back2list">戻る -CANCEL-</button>
        <button class="button is-danger" @click="modal = true">削除 -DELETE-</button>
      </div>
    </div>
    <!-- delete confirm modal window -->
    <div class="modal" :class="{ 'is-active' : modal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <article class="message is-medium">
          <div class="message-header">
            <p>本当に削除しますか？</p>
          </div>
          <div class="message-body">
            <p>削除する場合は<strong>OK</strong>を、削除せず戻る場合は<strong>CANCEL</strong>を押してください。</p>
            <br>
            <div class="buttons container">
              <button class="button is-danger" @click="deleteDB()">OK</button>
              <button class="button is-danger is-light" @click="modal = false">Cancel</button>
          </div>
          </div>
        </article>
      </div>
    </div>

  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: 'user',
  data(){
    return {
      user : {
        name : '',
        windows_id : '',
        operator_id : '',
        uccx_id : '',
        department : '',
        role : '',
        job_title : '',
        remarks : '',
        created_at : ''
      },
      modal: false,
      done : false,
      msg:''
    }
  },
  methods:{
    back2list(){
      this.$router.push("/userlist")
    },
    update_db(){
      //create SQL statement
      let sql = "";

      delete this.user.id
      this.user.created_at = this.getToday();

      for(let key in this.user){
        if(sql != ""){
          sql += ","+key + "='"+this.user[key]+"'";
        }else{
          sql += key + "='"+this.user[key]+"'";
        }
      }

      let id = this.$route.params.id;
      console.log(sql)
      axios
        .get("http://lejnet/ISNet/UMT/db.asp", {
          params:{
            req : "update",
            qry : "UPDATE master SET "+sql+" WHERE id="+id
          }
        })
        .then(response => {
          console.log(response);
          this.dispMsg("更新完了しました");
        })
        .catch()
    },
    deleteDB(){
      let id = this.$route.params.id;
      axios
        .get("http://lejnet/ISNet/UMT/db.asp",{
          params:{
            req:'delete',
            qry: id,
            opr: this.operator_id
          }
        })
        .then(response => {
          this.dispMsg("削除しました")
          console.log(response.data)
          this.$router.push("/userlist")
        })
        .catch()

    },
    getToday(){
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth()+1;
      let day = today.getDate();
      return year +"/"+month+"/"+day;
    },
    dispMsg(msg){
      this.msg = msg
      this.done = true;
    }
  },
  created: function(){

    let id = this.$route.params.id;
    axios
      .get("http://lejnet/ISNet/UMT/db.asp",
        {
          params:{
            req : "read",
            qry : "SELECT * FROM master WHERE id="+id
          }
        }
      )
      .then(response => {

          let userInfo = response.data.body[0];

          for(var key in this.user){
            this.user[key] = userInfo[key]
          }

        })
      .catch(
        // eslint-disable-next-line
        console.log("failed to load data.")
      )
  }
}
</script>

<style lang="stylus" scoped>
  .section
    max-width 600px
  .buttons
    button
      margin 0 auto
  
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s;

  .fade-enter, .fade-leave-to
    opacity: 0;
</style>
