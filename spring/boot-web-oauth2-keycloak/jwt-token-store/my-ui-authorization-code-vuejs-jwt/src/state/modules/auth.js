import axios from 'axios'
import VueAuthenticate from '../../authenticate/authenticate'
const vueAuth = new VueAuthenticate({
  baseUrl: 'http://localhost:9010', // Your API domain
  tokenName: 'access_token',
  storageType: 'cookieStorage',
  localClientId: 'productClientIdCode',
  providers: {
    github: {
      url: 'http://localhost:8081/spring-security-oauth-server/auth/github', 	
      oauthType: '2.0',
      clientId: '1f9824d889fc63e9e97a',
      redirectUri: 'http://localhost:9010/auth/callback', // Your client app URL
    },
    google: {
      // responseType: 'token',
      url: 'http://localhost:8081/spring-security-oauth-server/auth/google',
      clientId:
        '108535420758-d5dkg6aejtuv7j523qmcu1025q3fcaft.apps.googleusercontent.com',
      redirectUri: 'http://localhost:9010/auth/callback', // Your client app URL
    },
    okta: {
      url: 'http://localhost:8081/spring-security-oauth-server/auth/okta',
      clientId: '0oafr0vkho3uwWknx0h7',
      redirectUri: 'http://localhost:9010/auth/callback', // Your client app URL
    },
    keycloak: {
      url: 'http://localhost:8081/spring-security-oauth-server/auth/keycloak', 	 
      clientId: 'login-app',
      redirectUri: 'http://localhost:9010/auth/callback', // Your client app URL
    },
  },
})

// function commitUser(commit, user) {
//   commit('SET_CURRENT_USER', user)
//   return user
// }

export const state = {
  currentUser: getSavedState('auth.currentUser'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders(state)
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state)
    dispatch('validate')
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, { username, password } = {}) {
    if (getters.loggedIn) return dispatch('validate')
    const  clientId = 'productClientIdCode'
    const scope = 'product,read,write'
    return axios.post('http://localhost:8081/spring-security-oauth-server/auth/local', { clientId, scope, username, password }).then(response => {
      const user = response.data
      commit('SET_CURRENT_USER', user)
      return user
    })
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit('SET_CURRENT_USER', null)
  },

  // Logs in the current user.
  socialLogin({ commit, dispatch, getters }, { provider } = {}) {
    if (getters.loggedIn) return dispatch('validate')
    vueAuth
      .authenticate(provider)
      .then(function(authResponse) {
        const user = authResponse.data
        commit('SET_CURRENT_USER', user)
        /*
        // fetch user only when resonseType is token
        if (provider === 'github') {
          axios.get('https://api.github.com/user').then(function(response) {
            return commitUser(commit, response)
          })
        } else if (provider === 'facebook') {
          axios
            .get('https://graph.facebook.com/v2.5/me', {
              params: { access_token: vueAuth.getToken() },
            })
            .then(function(response) {
              return commitUser(commit, response)
            })
        } else if (provider === 'google') {
          // https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=ya29.GlsCBiFr3OidhjYShfqj0ILWCmU9KcP1qLiU4sQTeECpSOj3gxNTx0U0MEgtnBb1bf-dxkcDYwpITSR73lb9B0rpgYCd3NgetDVJe88N9cbKRRFOWT9T4v2YxY67
          axios
            .get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
            .then(function(response) {
              console.log('>>>>>>>>>>>>>>>>>>>> 3')
              return commitUser(commit, response)
            })
        } else if (provider === 'okta') {
          axios
            .get('https://dev-727816.oktapreview.com/oauth2/v1/userinfo')
            .then(function(response) {
              return commitUser(commit, response)
            })
        } else if (provider === 'keycloak') {
          axios
            .get(
              'http://localhost:8180/auth/realms/SpringBootKeycloak/protocol/openid-connect/userinfo'
            )
            .then(function(response) {
              return commitUser(commit, response)
            })
        } else if (provider === 'twitter') {
          return commitUser(commit, authResponse.body.profile)
        } else if (provider === 'instagram') {
          return commitUser(commit, authResponse)
        } else if (provider === 'bitbucket') {
          axios
            .get('https://api.bitbucket.org/2.0/user')
            .then(function(response) {
              return commitUser(commit, response)
            })
        } else if (provider === 'linkedin') {
          return commitUser(commit, authResponse)
        } else if (provider === 'live') {
          return commitUser(commit, authResponse)
        }
        */
      })
      .catch(function(err) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> 4')
        console.log(err)
        // this_.response = err
      })
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
	return state.currentUser ? state.currentUser : null; 
	/*
    if (!state.currentUser) return Promise.resolve(null)

    return axios
      .get('/api/session')
      .then(response => {
        const user = response.data
        commit('SET_CURRENT_USER', user)
        return user
      })
      .catch(error => {
        if (error.response.status === 401) {
          commit('SET_CURRENT_USER', null)
        }
        return null
      })
      */
  },
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common.Authorization = state.currentUser
    ? state.currentUser.token
    : ''
}
