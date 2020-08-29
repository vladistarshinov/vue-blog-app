<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="row">
        <div class="col s12 m6">
          <div class="card">
            <div class="card-content black-text">
              <h3>{{ record.title }}</h3>
              <small>{{ record.date | dateFilter('datetime') }}</small>
              <h6>{{ record.shortDescription }}</h6>
              <p>{{ record.description }}</p>
              <Comments :record='record' :records='records' />
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Записи с id=<strong>{{ $route.params.id }}</strong> не обнаружено</p>
  </div>
</template>

<script>
import Comments from '@/components/Comments.vue'
export default {
  name: 'detail',
  data () {
    return {
      record: null,
      records: [], //
      loading: true
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    this.records = await this.$store.dispatch('fetchRecords', id) //
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
  components: {
    Comments
  }
}
</script>
