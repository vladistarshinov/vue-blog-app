<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="row">
        <div class="col s12 m6">
          <div class="card">
            <div class="card-content black-text">
              <p>Название статьи: {{ record.title }}</p>
              <p>Короткое описание: {{ record.shortDescription }}</p>
              <p>Описание: {{ record.description }}</p>

              <small>{{ record.date }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Записи с id=<strong>{{ $route.params.id }}</strong> не обнаружено</p>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      record: null,
      loading: true
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
  }
}
</script>
