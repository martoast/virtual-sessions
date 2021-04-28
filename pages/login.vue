<template>
  <div>
    <h2 class="title has-text-centered">Log In</h2>

    <!-- <Notification v-if="error" type="danger" :message="error" /> -->

    <form method="post" @submit.prevent="login">
      <v-text-field v-model="form.email" label="E-mail" required></v-text-field>
      <v-text-field
        v-model="form.password"
        :counter="10"
        type="password"
        label="Password"
        required
      ></v-text-field>

      <div class="control">
        <button type="submit" class="button is-dark">Log In</button>
      </div>
    </form>
    <div style="margin-top: 20px">
      <p>
        Don't have an account?
        <nuxt-link to="/register">Register</nuxt-link>
      </p>
      <p>
        <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  middleware: 'guest',
  components: {
    Notification,
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      error: null,
    }
  },
  methods: {
    async login() {
      this.error = null
      try {
        await this.$auth.loginWith('local', {
          data: {
            identifier: this.form.email,
            password: this.form.password,
          },
        })
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
        alert(this.error)
      }
    },
  },
}
</script>
