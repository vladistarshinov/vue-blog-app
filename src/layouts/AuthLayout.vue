<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <AuthNavbar />
      <main class="app-content">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div class="fixed-action-btn" v-if="isAdmin">
        <router-link class="btn-floating btn-large red" to="/create">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AuthNavbar from '@/components/AuthNavbar.vue'

export default {
  name: 'auth-layout',
  data () {
    return {
      loading: true,
      isAdmin: false
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.isAdmin = this.$store.getters.info.isAdmin
    if (localStorage.getItem('user') == null) {
      this.isAuth = false
    } else {
      this.isAuth = JSON.parse(localStorage.getItem('user')).isAuth
    }
    this.loading = false
  },
  components: {
    AuthNavbar
  }
}
</script>
