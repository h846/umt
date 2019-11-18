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
          <h2 class="subtitle"> Created at : {{ created_at }}</h2>
        </div>
      </div>
    </section>

    <div class="container section">

      <div class="level">
        <div class="level-item">
          <div class="field">
            <label class="label">氏名 (ローマ字)</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: Hanako Yamada" v-model="name">
            </div>
            <p class="help">Name</p>
          </div>
        </div>

        <div class="level-item">
          <div class="field">
            <label class="label">ユーザーID</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: hyamada" v-model="windows_id">
            </div>
            <p class="help">User ID</p>
          </div>
        </div>
      </div>
      
      <div class="level">
        <div class="level-item">
          <div class="field">
            <label class="label">オペレーターID</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: hy" v-model="operator_id">
            </div>
            <p class="help">Operator ID</p>  
          </div>
        </div>

        <div class="level-item">
          <div class="field">
            <label class="label">UCCX ID</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: 887XXXX" v-model="uccx_id">
            </div>
            <p class="help">UCCX ID</p>  
          </div>
        </div>
      </div>

      <div class="level">
        <div class="level-item">
          <div class="field">
            <label class="label">所属</label>
            <div class="control">
              <input class="input" type="text" placeholder="ex: Customer Sales - CSR" v-model="department">
            </div>
            <p class="help">Department</p> 
          </div>
        </div>
      
        <div class="level-item">
          <div class="field">
            <label class="label">備考</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-model="remarks">
            </div>
            <p class="help">Remarks</p>  
          </div>
        </div>
      </div>
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
            <p>削除する場合は<strong>OK</strong>を、キャンセルする場合は<strong>CANCEL</strong>を押してください。</p>
            <br>
            <div class="buttons container">
              <button class="button is-danger">OK</button>
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
      name : '',
      windows_id : '',
      operator_id : '',
      uccx_id : '',
      department : '',
      remarks : '',
      created_at : '',
      modal: false
    }
  },
  methods:{
    back2list(){
      this.$router.push("/userlist")
    },
    update_db(){
      let sql = "";
      sql += "name='"+this.name+"'" || "\"\"";
      sql = sql + ",";
      sql += " windows_id='"+this.windows_id+"'" || "\"\"";
      sql = sql + ",";
      sql += " operator_id='"+this.operator_id+"'" || "\"\"";
      sql = sql + ",";
      sql += " uccx_id='"+this.uccx_id+"'" || "\"\"";
      sql = sql + ",";
      sql += " department='"+this.department+"'" || "\"\"";
      sql = sql + ",";
      sql += " remarks='"+this.remarks+"'" || "\"\"";
      sql = sql + ",";
      sql += " updated_at='"+this.getToday()+"'" || "\"\"";
      let id = this.$route.params.id;

      axios
        .get("http://lejnet/ISNet/UMT/db.asp", {
          params:{
            req : "write",
            qry : "UPDATE master SET "+sql+" WHERE id="+id
          }
        })
        .then(response => {
          console.log(response)
        })
        .catch()
    },
    deleteDB(){

    },
    getToday(){
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth()+1;
      let day = today.getDate();
      return year +"/"+month+"/"+day;
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
          //console.log(response);
          let userInfo = response.data.body[0];

          this.name = userInfo.name;
          this.windows_id = userInfo.windows_id;
          this.operator_id = userInfo.operator_id;
          this.uccx_id = userInfo.uccx_id;
          this.department = userInfo.department;
          this.remarks = userInfo.remarks;
          this.created_at = userInfo.created_at;
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
</style>
