<template>
  <div>
    <div class="page-title">
      <h3>Все посты</h3>
    </div>
    <Loader v-if="loading" />
    <div class="row" v-else>
      <PostList v-if="records.length" :records="records" />
      <p class="text-center" v-else>Записей в блоге нет. Добавьте <router-link to="record">первую</router-link></p>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
export default {
  name: 'home-not-auth-page',
  data () {
    return {
      loading: true,
      records: [],
      isAuth: false
    }
  },
  async mounted () {
    this.records = await this.$store.dispatch('fetchPosts')
    if (localStorage.getItem('user') == null) {
      this.isAuth = false
    } else {
      this.isAuth = JSON.parse(localStorage.getItem('user')).isAuth
    }
    if (this.isAuth) {
      this.$router.push('/home')
      this.$message('Вы авторизованы')
    }
    this.loading = false
  },
  components: {
    PostList
  }
}
</script>
