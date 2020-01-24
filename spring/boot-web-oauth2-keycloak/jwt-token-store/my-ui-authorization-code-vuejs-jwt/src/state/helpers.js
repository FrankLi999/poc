import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: state => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', [
  'logIn',
  'logOut',
  'socialLogin',
])

export const productComputed = {
  ...mapState('auth', {
    currentUser: state => state.currentUser,
  }),
  ...mapGetters('product', ['currentProduct']),
}

export const productMethods = mapActions('product', ['getProduct'])
