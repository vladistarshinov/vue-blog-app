<template>
  <div>
    <div class="page-title">
      <h3>Редактировать пост</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="title"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
        >
        <label for="title">Title</label>
         <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >Введите название поста</span>
      </div>

      <div class="input-field">
        <input
            id="shortDescription"
            type="text"
            v-model="shortDescription"
            :class="{ invalid: $v.shortDescription.$dirty && !$v.shortDescription.required }"
        >
        <label for="shortDescription">Краткое описание</label>
         <span
            v-if="$v.shortDescription.$dirty && !$v.shortDescription.required"
            class="helper-text invalid"
          >Введите краткое описание</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{ invalid: $v.description.$dirty && !$v.description.required }"
        >
        <label for="description">Краткое описание</label>
         <span
            v-if="$v.description.$dirty && !$v.description.required"
            class="helper-text invalid"
          >Введите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'updatePost',
  data () {
    return {
      title: '',
      shortDescription: '',
      description: ''
    }
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
  validations: {
    title: { required },
    shortDescription: { required },
    description: { required }
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('createRecord', {
          title: this.title,
          shortDescription: this.shortDescription,
          description: this.description,
          date: new Date().toJSON()
        })

        this.$message('Запись успешно создана')
        this.$v.$reset()
        this.title = ''
        this.shortDescription = ''
        this.description = ''
        this.$router.push('/admin')
      } catch (e) {}
    }
  }
}
</script>
