<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <AdminNavbar />
      <main class="app-content">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/create">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'

export default {
  name: 'main-layout',
  data () {
    return {
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: {
    AdminNavbar
  }
}
</script>
