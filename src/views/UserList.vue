<template>
  <div class="userlist">
    <loader v-if="loading"></loader>
    <div class="table-container is-striped">
    <table class="table is-bordered is-striped">
      <thead>
        <tr>
          <th v-for="hdr in res_hdr" :key="hdr.Master_ID">{{hdr}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="items in res_bdy" :key="items.Master_ID">
          <td v-for="item in items" :key="item.Master_ID">
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
    </div>
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
      loading: true
    }
  },
  methods: {

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

</style>