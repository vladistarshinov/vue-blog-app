<template>
  <div>
    <div class="page-title">
      <h3>Все посты</h3>
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
  name: 'home-auth-page',
  data () {
    return {
      loading: true,
      records: [],
      isAuth: true
    }
  },
  async mounted () {
    this.records = await this.$store.dispatch('fetchPosts')
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    localStorage.getItem('posts')
    this.loading = false
  },
  components: {
    PostList
  }
}
</script>
