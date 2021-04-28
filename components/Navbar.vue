<template>
  <v-app-bar :clipped-left="clipped" fixed app>
    <v-toolbar-title v-text="title" />
    <v-spacer />

    <div v-if="isAuthenticated">
      <a class="navbar-link">
        {{ loggedInUser.username }}
      </a>
      <v-btn text to="/login"> profile </v-btn>
      <v-btn text to="/register"> log out </v-btn>
    </div>

    <div v-if="!isAuthenticated">
      <v-btn text to="/login"> Login </v-btn>
      <v-btn text to="/register"> Sign up </v-btn>
    </div>
  </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      clipped: false,
      title: 'Virtual Sessions',
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },

  mounted() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    )
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach((el) => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target
          const $target = document.getElementById(target)
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active')
          $target.classList.toggle('is-active')
        })
      })
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
