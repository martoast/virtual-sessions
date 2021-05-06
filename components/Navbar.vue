<template>
  <div>
    <v-navigation-drawer
      v-if="isAuthenticated && loggedInUser"
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-list-item v-on="on">
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/men/78.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content v-if="loggedInUser">
              <v-list-item-title>{{ loggedInUser.username }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3>{{ loggedInUser.username }}</h3>
              <p class="caption mt-1">
                {{ loggedInUser.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text :to="editaccount_url">
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout"> Logout </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        v-if="isAuthenticated"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title @click="$router.push('/')" v-text="title" />
      <v-spacer />

      <div v-if="!isAuthenticated">
        <v-row>
          <v-col cols="12" class="py-2"
            ><v-btn-toggle tile color="deep-purple accent-3" group>
              <v-btn value="left" to="/login"> Login </v-btn>

              <v-btn value="right" to="/register"> Sign up </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      clipped: false,
      title: 'Virtual Sessions',
      drawer: null,
      editaccount_url: null,
      items: [{ title: 'Home', icon: 'mdi-home', to: '/' }],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },

  mounted() {
    if (this.loggedInUser) {
      this.items.push({
        title: 'Profile',
        icon: 'mdi-face-profile',
        to: '/' + this.loggedInUser.username,
      })
      this.editaccount_url = '/' + this.loggedInUser.username + '/edit'
    }

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
      try {
        await this.$auth.logout()
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
<style>
.v-btn:not(.v-btn--round).v-size--default {
  height: 36px !important;
  min-width: 64px !important;
}
</style>
