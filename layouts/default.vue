<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn text> Login </v-btn>
      <v-btn text to="/register"> Sign up </v-btn>
    </v-app-bar>
    <Navbar />
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
import Navbar from '~/components/Navbar'
export default {
  components: {
    Search,
    Navbar,
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
}
</script>
