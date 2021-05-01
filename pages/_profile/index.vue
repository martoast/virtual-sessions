<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
    </div>
  </section>
</template>

<script>
export default {
  async fetch({ store, params }) {
    await store.dispatch('teacher/find', params.profile)
  },
  data() {
    return {}
  },
  created() {
    console.log()
  },
}
</script>
