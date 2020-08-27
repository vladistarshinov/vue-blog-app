<template>
  <div class="col s12 m6">
    <div>
      <!-- prevent - without restart page -->
      <form @submit.prevent="submitHandler">
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
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import M from 'materialize-css'
export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      select: null,
      title: '',
      shortDescription: '',
      description: '',
      current: null
    }
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  validations: {
    title: { required },
    shortDescription: { required },
    description: { required }
  },
  created () {
    const { title, shortDescription, description } = this.records
    this.title = title
    this.shortDescription = shortDescription
    this.description = description
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const recordsData = {
          title: this.title,
          shortDescription: this.shortDescription,
          description: this.description
        }
        await this.$store.dispatch('updateRecord', recordsData)
        this.$message('Категория успешно обновлена')
        // for update at frontend
        this.$emit('updated', recordsData)
      } catch (e) {}
    }
  }
}
</script>
