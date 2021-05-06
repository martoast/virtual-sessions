<template>
  <div>
    <h2 class="title has-text-centered">Log In</h2>
    <Notification v-if="error" type="danger" :message="error" />
    <form method="post" @submit.prevent="login">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Password"
        required
      ></v-text-field>

      <v-btn type="submit">Log In</v-btn>
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
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
  middleware: 'guest',
  mixins: [validationMixin],
  components: {
    Notification,
  },
  validations: {
    email: { required, email },
  },
  data() {
    return {
      email: null,
      password: null,
      error: null,
    }
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },
  methods: {
    async login() {
      this.error = null
      try {
        await this.$auth.loginWith('local', {
          data: {
            identifier: this.email,
            password: this.password,
          },
        })
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>
