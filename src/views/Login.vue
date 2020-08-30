<template>
  <div>
    <div v-if="isAuth">
      <p>Вы уже авторизованы!</p>
      <br>
      <p class="center">
        <router-link class="btn waves-effect waves-orange auth-submit" to="/home">Перейти на главную</router-link>
      </p>
    </div>
    <form class="card auth-card" v-else @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">Вход в систему</span>
        <div class="input-field">
          <input
              id="email"
              type="text"
              v-model.trim="email"
              :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          >
          <label for="email">Email</label>
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
          >
            Поле Email не должно быть пустым
          </small>
          <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
          >
            Введите корректный Email
          </small>
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          >
          <label for="password">Пароль</label>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
          >
            Введите пароль (не менее {{$v.password.$params.minLength.min}} символов)
          </small>
          <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
          >
            Введите пароль (осталось ввести {{$v.password.$params.minLength.min - password.length}})
          </small>
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
              class="btn waves-effect waves-orange auth-submit white-text"
              type="submit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      isAuth: false
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    if (localStorage.getItem('user') == null) {
      this.isAuth = false
    } else {
      this.isAuth = JSON.parse(localStorage.getItem('user')).isAuth
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      const localData = {
        ...formData,
        isAuth: true
      }
      localStorage.setItem('user', JSON.stringify(localData))
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/home')
      } catch (e) { }
    }
  }
}
</script>
