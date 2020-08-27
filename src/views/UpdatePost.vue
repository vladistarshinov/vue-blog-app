<template>
  <div>
    <div class="page-title">
      <h3>Редактировать пост</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <RecordEdit
          v-if="records.length"
          :records="records"
          @updated="updateRecord"
          :key="records.length + updateCount"
        />
        <p class="center" v-else>NoCategories</p>
      </div>
    </section>
  </div>
</template>

<script>
import RecordEdit from '@/components/RecordEdit'
export default {
  name: 'updatePost',
  data () {
    return {
      records: [],
      loading: true,
      updateCount: 0
    }
  },
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    this.loading = false
  },
  components: {
    RecordEdit
  },
  methods: {
    updateRecord (record) {
      const index = this.records.findIndex(c => c.id === record.id)
      this.records[index].title = record.title
      this.records[index].shortDescription = record.shortDescription
      this.records[index].description = record.description
      this.updateCount++
    }
  }
}
</script>
