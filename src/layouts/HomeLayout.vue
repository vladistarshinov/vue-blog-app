<template>
  <div>
    <div class="app-main-layout">
      <HomeNavbar />
      <main class="app-content">
        <div class="app-page">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import HomeNavbar from '@/components/HomeNavbar.vue'

export default {
  name: 'home-layout',
  data () {
    return {
      loading: true
    }
  },
  components: {
    HomeNavbar
  }
}
</script>
