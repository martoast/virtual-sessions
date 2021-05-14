<template>
  <div>
    <teacher-cards
      v-if="instructors"
      :instructors="instructors.data"
    ></teacher-cards>
  </div>
</template>

<script>
import TeacherCards from '~/components/Main/Card'
import { mapGetters } from 'vuex'
export default {
  components: {
    TeacherCards,
  },
  async created() {
    await this.$store.dispatch('instructors/get')
  },

  computed: {
    ...mapGetters({
      instructors: 'instructors/items',
    }),
  },
}
</script>
