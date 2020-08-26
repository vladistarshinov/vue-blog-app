<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">Блог</span>
      </div>
      <div class="navbar-right">
        <router-link to="/login" class="black-text" href="#">
          <span><i class="material-icons">assignment_return</i>Войти</span>
        </router-link>
        <router-link to="/register" class="black-text" href="#">
          <span><i class="material-icons">assignment_return</i>Регистрация</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css'

export default {
  data () {
    return {
      dropdown: null
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
      localStorage.removeItem('user')
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
  },
  mounted () {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
      autoTrigger: true
    })
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
