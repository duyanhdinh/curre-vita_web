const resource = '/auth/'
const register = resource + 'register'
const login = resource + 'login'

const saveToken = (auth, data) => {
  auth.loginData(data)

  return data
}

export default ($axios, $authenticate, $auth) => ({
  register (data) {
    return $axios.post(register, data)
  },

  login (data) {
    return $axios.post(login, data)
      .then(({ data }) => saveToken($auth, data))
  },

  loginWith (provider) {
    return $authenticate.authenticate(provider)
      .then(({ data }) => saveToken($auth, data))
  }
})
