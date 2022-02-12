const resource = '/auth/'
const register = resource + 'register'
const login = resource + 'login'

const saveToken = (auth, data) => {
  auth.loginData(data)

  return data
}

export default (context, axios) => ({
  register (data) {
    return axios.post(register, data)
  },

  login (data) {
    return axios.post(login, data)
      .then(({ data }) => saveToken(context.$auth, data))
  },

  loginWith (provider) {
    return context.$authenticate.authenticate(provider)
      .then(({ data }) => saveToken(context.$auth, data))
  }
})
