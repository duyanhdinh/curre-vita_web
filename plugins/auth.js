export default ({ store }, inject) => {
  inject('auth', {
    init: () => store.dispatch('auth/init'),
    loginData: n => store.dispatch('auth/loginData', n),
    login: () => store.dispatch('auth/login'),
    logout: () => store.dispatch('auth/logout'),
    loggedIn: () => store.getters['auth/loggedIn'],
    user: () => store.getters['auth/user']
  })
}
