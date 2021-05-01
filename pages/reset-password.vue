<template>
  <div>
    <h2 class="title has-text-centered">Reset Password</h2>

    <Notification v-if="success" type="success" :message="success" />
    <Notification v-if="error" type="danger" :message="error" />

    <form
      v-if="!success"
      id="reset-password"
      method="post"
      @submit.prevent="resetPassword"
    >
      <label class="label">New Password</label>

      <v-text-field
        v-model="password1"
        type="password"
        class="input"
        name="password"
      />

      <label class="label">Confirm New Password</label>

      <v-text-field
        v-model="password2"
        type="password"
        class="input"
        name="password"
      />

      <div class="control">
        <v-btn type="submit" form="reset-password" class="button is-dark">
          Reset Password
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  components: {
    Notification,
  },
  asyncData(context) {
    if (!context.route.query.code) context.redirect('/forgot-password')
    else
      return {
        code: context.route.query.code,
      }
  },
  data() {
    return {
      password1: '',
      password2: '',
      success: null,
      error: null,
    }
  },
  methods: {
    async resetPassword() {
      this.error = null
      if (this.password1 !== this.password2) {
        this.error = 'Passwords do not match.'
        return
      }
      try {
        await this.$axios.post('auth/reset-password', {
          code: this.code,
          password: this.password1,
          passwordConfirmation: this.password2,
        })
        this.success =
          'Password updated successfully. You can now use it to log in to your account.'
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>
