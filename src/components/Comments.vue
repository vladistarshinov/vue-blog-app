<template>
  <div>
    <form class="form form__comments" v-if="!info && isAuth" @submit.prevent="submitHandler">
      <h5>Оставьте свой комментарий</h5>
      <input
        id="comment"
        type="text"
        v-model="comment"
        :class="{ invalid: $v.comment.$dirty && !$v.comment.required }"
      >
      <div>
        <button class="btn waves-effect waves-light white-text" type="submit">
          Отправить
          <i class="material-icons right">send</i>
        </button>
        <span
        style="padding-left: 10px;"
        v-if="$v.comment.$dirty && !$v.comment.required"
        class="helper-text invalid"
        >Введите комментарий</span>
      </div>
    </form>
    <div class="comments">
      <h5 class="text-center" v-if="commentsLength && isAuth">Комментарии</h5>
      <h5 v-else-if="!isAuth">Авторизируйтесь для просмотра комментариев</h5>
      <h5 v-else>Нет комментариев</h5>
      <v-card
        class="mx-auto card__comments"
        max-width="90%"
        v-for="(comment, idx, numPos) in record.comments"
        :key="numPos"
      >
        <v-card-title v-if="isAuth">
          {{comment.name}}
        </v-card-title>
        <v-card-subtitle v-if="isAuth">
          {{ comment.comment }}
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="purple"
            text
            @click.prevent="deleteComment(record, idx, numPos)"
            v-if="info"
          >
            <i class="small material-icons">delete_forever</i>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { firebase } from '@firebase/app'
import { required } from 'vuelidate/lib/validators'
export default {
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      info: this.$store.getters.info.isAdmin,
      comment: '',
      commentsLength: 0,
      coms: [],
      isAuth: false
    }
  },
  validations: {
    comment: { required }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
  },
  async mounted () {
    if (this.record.comments !== undefined) {
      this.commentsLength = Object.keys(this.record.comments).length
    } else {
      this.commentsLength = 0
    }
    if (localStorage.getItem('user') == null) {
      this.isAuth = false
    } else {
      this.isAuth = JSON.parse(localStorage.getItem('user')).isAuth
    }
    this.coms = await this.$store.dispatch('fetchComments', this.record.id)
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('createComment', {
          id: this.record.id,
          name: this.$store.getters.info.name,
          comment: this.comment,
          date: new Date().toJSON()
        })

        this.$message('Комментарий успешно отправлен')
        this.$v.$reset()
        this.comment = ''
        this.$router.push('/home')
      } catch (e) {}
    },
    async deleteComment (record, idx, numPos) {
      if (confirm('Вы действительно хотите удалить комментарий?')) {
        try {
          await firebase.database().ref(`/users/records/${record.id}/comments`).child(idx).remove()
          /* const i = this.$store.dispatch('deleteComment', this.record.id, idx) */
          this.$message('Комментарий удален')
          this.record.comments = this.coms.filter(array => array !== this.coms[numPos])
        } catch (e) { }
      }
    }
  }
}
</script>
