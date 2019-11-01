<template>
  <div class="userlist">
    <section v-if="loading">
      <br/>
      <p>Loading...</p>
      <loader></loader>
    </section>
    <section v-else class="container is-fluid">
      <input class="input" type="text" v-model="srchWrd" placeholder="検索語句を入力">
      <div class="table-container" style="margin: 20px 0">
        <table class="table is-bordered is-hoverable">
          <thead>
            <tr>
              <th v-for="hdr in res_hdr" @click="sorting(hdr)" :key="hdr.Master_ID">{{ hdr }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="list in filteredUsers" :key="list.Master_ID" @click="editUser(list.Master_ID)">
              <td v-for="item in list" :key="item.Master_ID">
                {{ item }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import loader from '../components/loader.vue'

export default {
  name: 'userlist',
  components:{
    loader : loader
  },
  data(){
    return {
      info: null,
      res_hdr: null,
      res_bdy: null,
      loading: true,
      srchWrd: ''
    }
  },
  computed:{
    filteredUsers: function(){
      let lists = [];

      for(var i in this.res_bdy){
        var user = this.res_bdy[i];
        if(user.Windows_ID.indexOf(this.srchWrd) !== -1 ||
           user.User_Name.toLowerCase().indexOf(this.srchWrd) !== -1){
             lists.push(user);
        }
      }
      return lists;
    }
  },
  methods: {
    sorting(hdr){
      this.res_bdy.sort(function(a, b){
        return a[hdr] > b[hdr] ? 1 : -1;
      })
    },
    editUser(id){
      alert(id);
    }
  },
  mounted(){
    axios
      .get("http://lejnet/ISNet/UMT/db.asp")
      .then(response => {
          this.res_hdr = response.data.header;
          this.res_bdy = response.data.body;
          this.loading = false;
        })
      .catch(
        // eslint-disable-next-line
        console.log("failed to load data.")
      )
  }
}
</script>

<style lang="sass">
  .table
    cursor: pointer
</style>