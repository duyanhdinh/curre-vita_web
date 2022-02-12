const resource = '/user/'
const isValid = resource + 'valid'

const config = cookies => ({
  headers: {
    Authorization: cookies.get('authorization') ?? ''
  }
})

export default (context, axios) => ({
  isValid () {
    return axios.post(isValid, {}, config(context.$cookies))
      .catch(({ response }) => {
        if (response.status === 422) { context.$auth.logout() }
      })
  }
})
