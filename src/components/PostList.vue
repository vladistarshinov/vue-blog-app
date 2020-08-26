<template>
 <div class="col">
   <v-card
    class="mx-auto"
    max-width="100%"
    v-for="(record, idx) in records"
    :key="idx"
  >
    <v-card-title>
      {{record.title}}
    </v-card-title>

    <v-card-subtitle>
      {{ record.shortDescription }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="purple"
        text
        @click="$router.push('/detail/' + record.id)"
      >
        Подробнее
      </v-btn>
       <v-btn
        color="purple"
        text
      >
      <router-link to="/edit">Редактировать</router-link>
      </v-btn>
       <v-btn
        color="purple"
        text
        @click="deletePost(record.id, idx)"
      >
        Удалить
      </v-btn>
    </v-card-actions>
  </v-card>
 </div>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  },
  mounted () {
    console.log(window.localStorage.user)
  },
  methods: {
    async deletePost (id, idx) {
      if (confirm('Вы действительно хотите удалить пост?')) {
        await this.$store.dispatch('deleteRecord', id)
        this.$message('Пост удален')
        this.records.splice(idx, 1)
      }
    }
  }
}
</script>
