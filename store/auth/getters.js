export const loggedIn = state => state.auth
export const user = state => ({
  email: state.email,
  username: state.username,
  avatar: state.avatar
})
