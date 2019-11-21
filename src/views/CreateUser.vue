<template>
  <section>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            新規ユーザー作成
          </h1>
          <h2 class="subtitle">
            作成と状況確認
          </h2>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">First Name:</label>
            <div class="control">
              <input class="input" type="text" v-model="user.fName" placeholder="Hanako">
            </div>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Last Name:</label>
            <div class="control">
              <input class="input" type="text" v-model="user.lName" placeholder="Tanaka">
            </div>
          </div>
        </div>

        <div class="column">
          <label class="label">Operator ID:</label>
          <div class="select">
            <select v-model="user.oprid">
              <option disabled value="">Please select OprID</option>
              <option v-for="item in oprmnu" :key="item.operator_id">{{ item.operator_id }}</option>
            </select>
          </div>
        </div>
      </div>
      <button @click="createUser()" class="button is-medium is-fullwidth is-info">SUBMIT</button>
    </section>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'create-user',
  data(){
    return {
      user : {
        fName : '',
        lName : '',
        oprid : '',
      },
      oprmnu : []
    }
  },
  mounted : function(){
    axios
      .get("http://lejnet/ISNet/UMT/db.asp",{
        params : {
          req : "read",
          qry : "SELECT top 5 operator_id FROM operator_ids WHERE windows_id IS NULL AND user_name IS NULL ORDER BY rnd(INT(NOW*ID)-NOW*ID)"
        }
      })
      .then(response => {
        this.oprmnu = response.data.body
      })
      .catch()
  },
  methods : {
    createUser(){

      if(
        this.user.fName == "" ||
        this.user.lName == "" ||
        this.user.oprid == ""){
          return alert("入力されていない項目があります")

      }
      let str = "'"+this.user.fName+", "+this.user.lName+"',"+" '"+this.user.oprid+"', '"+this.getToday()+"'"
      axios
        .get("http://lejnet/ISNet/UMT/db.asp",{
            params:{
              req : 'create',
              qry : "INSERT INTO master(name, operator_id, created_at) VALUES("+str+")",
              opr : this.user.oprid,
              name : this.user.fName+", "+this.user.lName
            }
          })
        .then(res => {
          console.log(res)
          alert("登録完了しました!")
          this.$router.push("/userlist");
        })
        .catch()
    },
    getToday(){
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth()+1;
      let day = today.getDate();
      return year +"/"+month+"/"+day;
    }
  }
}
</script>