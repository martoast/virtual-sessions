<template>
  <div>
    <Notification v-if="success" type="success" :message="success" />
    <Notification v-if="error" type="danger" :message="error" />
    <form v-if="!success" method="post" @submit.prevent="submit">
      <h1 class="title">Register</h1>
      <v-text-field
        v-model="username"
        :error-messages="usernameErrors"
        :counter="10"
        label="Username"
        required
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
      ></v-text-field>
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
      <v-select
        v-model="selected_genres"
        :items="genres"
        label="Select genres"
        multiple
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index === 0">
            <span>{{ item }}</span>
          </v-chip>
          <span v-if="index === 1" class="grey--text caption">
            (+{{ selected_genres.length - 1 }} others)
          </span>
        </template>
      </v-select>
      <v-checkbox
        v-model="checkbox"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import Notification from '~/components/Notification'

export default {
  mixins: [validationMixin],
  middleware: 'guest',
  components: {
    Notification,
  },

  validations: {
    username: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    password: { required },
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    username: null,
    email: null,
    password: null,
    selected_genres: [],
    select: null,
    checkbox: false,
    genres: ['House', 'Basshouse', 'Dubstep', 'Drum&Bass', 'Garage', 'Techno'],
    success: null,
    error: null,
  }),

  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.username.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
    async submit() {
      this.$v.$touch()
      try {
        this.$axios.setToken(false)
        await this.$axios.post('auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        this.success = `A confirmation link has been sent to your email account. \
 Please click on the link to complete the registration process.`
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
    clear() {
      this.$v.$reset()
      this.username = null
      this.password = null
      this.email = null
      this.select = null
      this.checkbox = false
    },
  },
}
</script>
