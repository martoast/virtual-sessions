<template>
  <div>
    <profile-card :teacher="teacher"></profile-card>
    <music-cards></music-cards>
    <calendar></calendar>
  </div>
</template>

<script>
import MusicCards from '~/components/Teacher/MusicCards'
import ProfileCard from '~/components/Teacher/ProfileCard'
import Calendar from '~/components/Teacher/Calendar'

export default {
  components: {
    MusicCards,
    ProfileCard,
    Calendar,
  },
  // async fetch({ store, params }) {
  //   await store.dispatch('teacher/find', params.profile)
  // },
  data() {
    return {
      teacher: {
        name: null,
        rate: 0,
      },
    }
  },
  mounted() {
    this.teacher.name = this.$route.params.profile
  },
}
</script>
