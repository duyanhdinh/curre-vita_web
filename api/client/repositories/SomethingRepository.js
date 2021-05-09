const resource = '/user/auth'
const register = resource + '/register-nc'

export default ($axios) => ({
  async register(data) {
    const res = await $axios.post(`${register}`, data)
    return await res.json()
  },
})
