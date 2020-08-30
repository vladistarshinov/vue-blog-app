<template>
  <nav class="navbar green darken-3">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons white-text">Blogger</i>
        </a>
      </div>
      <div class="navbar-right" v-if="!isAuth">
        <router-link to="/login" class="white-text" href="#">
          <span><i class="material-icons">input</i>Войти</span>
        </router-link>
        <router-link to="/register" class="white-text" href="#">
          <span><i class="material-icons">assignment_return</i>Регистрация</span>
        </router-link>
      </div>
      <ul class="right" v-else>
        <li class="white-text">
            Вы авторизованы!
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css'

export default {
  data () {
    return {
      dropdown: null,
      isAuth: false
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
    if (localStorage.getItem('user') == null) {
      this.isAuth = false
    } else {
      this.isAuth = JSON.parse(localStorage.getItem('user')).isAuth
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
