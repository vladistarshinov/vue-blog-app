<template>
  <div>
    <div v-if="isAuth">
      <p>Вы уже авторизованы!</p>
      <br>
      <p class="center">
        <router-link class="btn waves-effect waves-orange auth-submit" to="/home">Перейти на главную</router-link>
      </p>
    </div>
    <form class="card auth-card" v-else @submit.prevent="handlerSubmit">
      <div class="card-content">
        <span class="card-title">Вход в блог</span>
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="name"
              :class="{invalid: $v.name.$dirty && !$v.name.required}"
          >
          <label for="name">Имя</label>
          <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
          >
            Введите ваше имя
          </small>
        </div>
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
        <p>
          <label>
            <input type="checkbox" v-model="agreement" />
            <span>С правилами согласен</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
              class="btn waves-effect waves-light auth-submit white-text"
              type="submit"
          >
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      agreement: false,
      isAuth: false
    }
  },
  validations: {
    name: { required },
    email: { email, required },
    password: { required, minLength: minLength(6) },
    agreement: { checked: v => v }
  },
  mounted () {
    if (localStorage.getItem('user') == null) {
      this.isAuth = false
    } else {
      this.isAuth = JSON.parse(localStorage.getItem('user')).isAuth
    }
  },
  methods: {
    async handlerSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      const localData = {
        ...formData,
        isAuth: true
      }
      localStorage.setItem('user', JSON.stringify(localData))

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/home')
      } catch (e) { }
    }
  }
}
</script>
