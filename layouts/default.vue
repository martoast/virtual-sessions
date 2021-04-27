<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="!isAuthenticated">
        <v-btn text to="/login"> Login </v-btn>
        <v-btn text to="/register"> Sign up </v-btn>
      </div>
      <div v-if="isAuthenticated">
        <a class="navbar-link">
          {{ loggedInUser.username }}
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item" href="/profile">My Profile</a>
          <hr class="navbar-divider" />
          <a class="navbar-item" @click="logout">Logout</a>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Search from '~/components/Layout/AppBar/Search'

import { mapGetters } from 'vuex'
export default {
  components: {
    Search,
  },

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Virtual Sessions',
    }
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

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
}
</script>
