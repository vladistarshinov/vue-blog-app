<template>
  <div>
    <form class="form" v-if="!info" @submit.prevent="submitHandler">
      <p>Оставьте свой комментарий</p>
      <input
        id="comment"
        type="text"
        v-model="comment"
        :class="{ invalid: $v.comment.$dirty && !$v.comment.required }"
      >
      <span
        v-if="$v.comment.$dirty && !$v.comment.required"
        class="helper-text invalid"
      >Введите комментарий</span>
      <button class="btn waves-effect waves-light" type="submit">
        Отправить
        <i class="material-icons right">send</i>
      </button>
    </form>
    <h5 v-if="commentsLength">Комментарии ({{ commentsLength }})</h5>
    <h5 v-else>Нет комментариев</h5>
    <v-card
      class="mx-auto"
      max-width="100%"
      v-for="(comment, idx, numPos) in record.comments"
      :key="numPos"
    >
      <v-card-title>
        {{comment.name}}
      </v-card-title>
      <v-card-subtitle>
        {{ comment.comment }}
      </v-card-subtitle>
      <v-btn
        color="purple"
        text
        @click.prevent="deleteComment(comment, idx, numPos)"
        v-if="info"
      >
        Удалить
      </v-btn>
    </v-card>
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
      res: '',
      records: [],
      coms: []
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
    this.records = await this.$store.dispatch('fetchRecords')
    this.coms = await this.$store.dispatch('fetchComments', this.record.id)
    console.log([this.record.comments][0])
    console.log(this.coms)
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
        this.$router.push('/admin')
      } catch (e) {}
    },
    async deleteComment (comment, idx, numPos) {
      console.log(comment.id)
      console.log(this.coms.filter(array => array !== this.coms[numPos]))
      if (confirm('Вы действительно хотите удалить коммент?')) {
        try {
          const i = await firebase.database().ref(`/users/records/${comment.id}/comments`).child(idx).remove()
          /* const i = this.$store.dispatch('deleteComment', this.record.id, idx) */
          console.log(i)
          this.$message('Комментарий удален')
          this.record.comments = this.coms.filter(array => array !== this.coms[numPos])
          /* this.record.comments.splice(numPos, 1) */
        } catch (e) { }
      }
    }
  }
}
</script>
