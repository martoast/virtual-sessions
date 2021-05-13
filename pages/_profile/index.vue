<template>
  <div>
    <profile-card :instructor="instructor"></profile-card>
    <calendar></calendar>
  </div>
</template>

<script>
import MusicCards from '~/components/Teacher/MusicCards'
import ProfileCard from '~/components/Teacher/ProfileCard'
import Calendar from '~/components/Teacher/Calendar'
import { mapGetters } from 'vuex'

export default {
  components: {
    MusicCards,
    ProfileCard,
    Calendar,
  },
  async fetch({ store, params }) {
    await store.dispatch('instructors/find', params.profile)
  },

  computed: {
    ...mapGetters({
      instructor: 'instructors/instructor',
    }),
  },
}
</script>
