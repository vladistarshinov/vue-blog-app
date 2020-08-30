<template>
  <div>
    <div class="page-title">
      <h3>Редактировать пост</h3>
    </div>
    <p v-if="!isAdmin">Вы не обладаете правами администратора для редактирования поста!</p>
    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="title"
            type="text"
            v-model="title"
        >
        <label for="title">Название</label>
        <small
          class="helper-text invalid"
          v-if="$v.title.$dirty && !$v.title.required"
        >
         Введите название
        </small>
      </div>
      <div class="input-field">
        <input
            id="shortDescription"
            type="text"
            v-model="shortDescription"
            :class="{invalid: $v.shortDescription.$dirty && !$v.shortDescription.required}"
        >
        <label for="shortDescription">Краткое описание</label>
        <small
          class="helper-text invalid"
          v-if="$v.shortDescription.$dirty && !$v.shortDescription.required"
        >
         Введите краткое описание
        </small>
      </div>
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Полное описание</label>
        <small
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >
         Введите полное описание
        </small>
      </div>
      <button class="btn waves-effect waves-light white-text" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import M from 'materialize-css'
export default {
  data () {
    return {
      name: '',
      record: [],
      title: '',
      shortDescription: '',
      description: '',
      isAdmin: this.$store.getters.info.isAdmin
    }
  },
  validations: {
    title: { required },
    shortDescription: { required },
    description: { required }
  },
  async mounted () {
    this.name = this.info.name
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchPostsById', id)
    // eslint-disable-next-line no-unused-vars
    this.record = {
      ...record
    }
    this.title = this.record.title
    this.shortDescription = this.record.shortDescription
    this.description = this.record.description
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updatePost']),
    async submitHandler () {
      try {
        await this.updatePost({
          id: this.record.id,
          title: this.title,
          shortDescription: this.shortDescription,
          description: this.description
        })
        console.log(this.title)
        this.$message('Категория успешно обновлена!')
        this.$router.push('/home')
      } catch (e) { }
    }
  }
}
</script>
