<template>
  <div>
    <div class="page-title">
      <h3>Блог</h3>
    </div>
    <Loader v-if="loading" />
    <div class="row" v-else>
      <PostList v-if="records.length" :records="records" />
      <p class="text-center" v-else>Записей в блоге нет. Добавьте <router-link to="create">первую</router-link></p>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import messages from '@/utils/messages'
export default {
  name: 'home',
  data () {
    return {
      loading: true,
      records: [],
      isAuth: true
    }
  },
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    this.loading = false
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    console.log(Object.keys(JSON.parse(JSON.stringify(this.records))[0].comments).length)
  },
  components: {
    PostList
  }
}
</script>
