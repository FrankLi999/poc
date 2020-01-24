<script>
import Layout from '@layouts/main'
import { authMethods } from '@state/helpers'
import appConfig from '@src/app.config'

export default {
  page: {
    title: 'Log in',
    meta: [{ name: 'description', content: `Log in to ${appConfig.title}` }],
  },
  components: { Layout },
  data() {
    return {
      username: '',
      password: '',
      code: null,
      type: null,
      rememberMe: false,
      fetchUser: false,
      authError: null,
      tryingToLogIn: false,
    }
  },
  methods: {
    ...authMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.tryingToLogIn = true
      // Reset the authError if it existed.
      this.authError = null
      return this.logIn({
        username: this.username,
        password: this.password,
      })
        .then(token => {
          this.tryingToLogIn = false

          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
        })
        .catch(error => {
          this.tryingToLogIn = false
          this.authError = error
        })
    },
    trySocialLogin(type) {
      this.tryingToLogIn = true
      this.authError = null
      this.socialLogin({
        provider: type,
      })
      this.tryingToLogIn = false

      // Redirect to the originally requested page, or to the home page
      this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
    },
  },
}
</script>

<template>
  <Layout>
    <div>
      <h3>Oauth2 Login via:</h3>

      <div v-show="!code || !type">
        <hr>
        <button @click="trySocialLogin('google')">Google</button>
        <button @click="trySocialLogin('keycloak')">Keycloak</button>
        <button @click="trySocialLogin('okta')">Okta</button>
        <hr>
      </div>

      <div v-show="code && type">
        Verifying {{ type }} code...
      </div>
    </div>
    <h3>Local Login:</h3>
    <form
      :class="$style.form"
      @submit.prevent="tryToLogIn"
    >
      <BaseInput
        v-model="username"
        name="username"
      />
      <BaseInput
        v-model="password"
        name="password"
        type="password"
      />
      <label>
        <input
          v-model="rememberMe"
          type="checkbox" >
        Remember Me
      </label>
      <label>
        <input
          v-model="fetchUser"
          type="checkbox" >
        Fetch User (test)
      </label>
      <BaseButton
        :disabled="tryingToLogIn"
        type="submit"
      >
        <BaseIcon
          v-if="tryingToLogIn"
          name="sync"
          spin
        />
        <span v-else>Log in</span>
      </BaseButton>
      <p v-if="authError">
        There was an error logging in to your account.
      </p>
    </form>
  </Layout>
</template>

<style lang="scss" module>
@import '@design';

.form {
  text-align: center;
}
</style>
