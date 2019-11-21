<template>
  <div class="editlog section">
    <h1>✪直近で削除したユーザー</h1>
    <div class="table-container">
        <table class="table is-bordered">
          <thead>
            <tr>
              <th v-for="hdr in hdr" :key="hdr.id">{{ hdr }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="list in bdy" :key="list.id">
              <td v-for="item in list" :key="item.id">
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
export default {
  name: 'editlog',
  data(){
    return {
      hdr : null,
      bdy : null
    }
  },
  mounted : function(){
    axios
      .get("http://lejnet/ISNet/UMT/db.asp",{
        params : {
          req:"read",
          qry:"SELECT TOP 5 * FROM deleted_users ORDER BY updated_at DESC"
        }
      })
      .then(res => {
        this.hdr = res.data.header;
        this.bdy = res.data.body;
        console.log(res.data)
      })
  }
}
</script>