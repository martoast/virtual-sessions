<template>
  <div>
    <Notification v-if="success" type="success" :message="success" />
    <Notification v-if="error" type="danger" :message="error" />
    <form v-if="!success" method="post" @submit.prevent="forgotPassword">
      <h1 class="title">Forgot Password</h1>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        type="email"
        name="email"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-btn class="mr-4" @click="forgotPassword"> submit </v-btn>
    </form>
  </div>
</template>
<script>
import Notification from '~/components/Notification'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  components: {
    Notification,
  },
  data() {
    return {
      email: '',
      success: null,
      error: null,
    }
  },
  validations: {
    email: { required, email },
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
    async forgotPassword() {
      this.$v.$touch()
      try {
        await this.$axios.post('auth/forgot-password', {
          email: this.email,
        })
        this.error = null
        this.success = `A reset password link has been sent to your email account. \
 Please click on the link to complete the password reset.`
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>
