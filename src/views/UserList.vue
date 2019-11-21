<template>
  <div class="userlist container section">
    <section v-if="loading">
      <loader></loader>
    </section>
    <section v-else>
      <!--SEARCH FIELD-->
      <input class="input" type="text" v-model="srchWrd" placeholder="検索語句を入力">
      <!--USER LIST-->
      <div class="table-container" style="margin: 20px 0">
        <table class="table is-bordered is-hoverable">
          <thead>
            <tr>
              <th v-for="hdr in res_hdr" @click="sorting(hdr)" :key="hdr.id">{{ hdr }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="list in filteredUsers" :key="list.id" @click="editUser(list.id)">
              <td v-for="item in list" :key="item.id">
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
        if(user.windows_id.indexOf(this.srchWrd) !== -1 ||
           user.name.toLowerCase().indexOf(this.srchWrd) !== -1){
             lists.push(user);
        }
      }
      return lists;
    }
  },
  methods: {
    sorting(hdr){
      this.res_bdy.sort(function(a, b){
        return a[hdr] < b[hdr] ? 1 : -1;
      })
    },
    editUser(id){
      this.$router.push({ name: 'user', params: { id: id } })
    }
  },
  mounted(){
    axios
      .get("http://lejnet/ISNet/UMT/db.asp", {
          params:{req:'read'}
        })
      .then(response => {
        console.log(response);
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

<style lang="sass" scoped>
  .table
    cursor: pointer
</style>