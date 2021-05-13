<template>
  <teacher-cards :instructors="instructors.data"></teacher-cards>
</template>

<script>
import TeacherCards from '~/components/Main/Card'
import { mapGetters } from 'vuex'
export default {
  components: {
    TeacherCards,
  },
  async fetch({ store }) {
    await store.dispatch('instructors/get')
  },

  created() {
    console.log(this.instructors)
  },

  computed: {
    ...mapGetters({
      instructors: 'instructors/items',
    }),
  },
}
</script>
