<template>
  <nav class="navbar green darken-3">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons white-text">Blogger</i>
        </a>
      </div>
      <ul class="right">
        <li>
          <a
              class="dropdown-trigger white-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            Привет, {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <a class="black-text" @click.prevent="logout" href="#">
                <i class="material-icons">exit_to_app</i>Выйти
              </a>
            </li>
          </ul>
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
