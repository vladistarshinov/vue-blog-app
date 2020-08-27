<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="row">
        <div class="col s12 m6">
          <div class="card">
            <div class="card-content black-text">
              <h3>{{ record.title }}</h3>
              <h6>{{ record.shortDescription }}</h6>
              <p>{{ record.description }}</p>
              <small>{{ record.date }}</small>
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
              <v-card
                class="mx-auto"
                max-width="100%"
                v-for="(comment, idx) in record.comments"
                :key="idx"
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
                  @click.prevent="deleteComment(record.id, record.comment.id, idx)"
                  v-if="info"
                >
                  Удалить
                </v-btn>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Записи с id=<strong>{{ $route.params.id }}</strong> не обнаружено</p>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'detail',
  data () {
    return {
      record: null,
      info: this.$store.getters.info.isAdmin,
      loading: true
    }
  },
  validations: {
    comment: { required }
  },
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    // eslint-disable-next-line no-unused-vars
    this.record = {
      ...record
    }
    this.loading = false
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
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
      } catch (e) {}
    },
    async deletePost (recordId, commentId, idx) {
      if (confirm('Вы действительно хотите удалить комментарий?')) {
        await this.$store.dispatch('deleteComment', recordId, commentId)
        this.$message('Комментарий удален')
        this.records.comments.splice(idx, 1)
      }
    }
  }
}
</script>
