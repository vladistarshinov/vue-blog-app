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
        v-if="info"
        @click="$router.push('/edit/' + record.id)"
      >Редактировать
      </v-btn>
       <v-btn
        color="purple"
        text
        @click="deletePost(record.id, idx)"
        v-if="info"
      >
        Удалить
      </v-btn>
      <v-spacer></v-spacer>
      <p>Комментарии: {{ records[idx].comments !== undefined ? Object.keys(records[idx].comments).length : 0 }}</p>
    </v-card-actions>
  </v-card>
 </div>
</template>

<script>
export default {
  data () {
    return {
      info: this.$store.getters.info.isAdmin
    }
  },
  props: {
    records: {
      type: Array,
      required: true
    }
  },
  methods: {
    async deletePost (id, idx) {
      console.log(idx)
      if (confirm('Вы действительно хотите удалить пост?')) {
        await this.$store.dispatch('deleteRecord', id)
        this.$message('Пост удален')
        this.records.splice(idx, 1)
      }
    }
  }
}
</script>
