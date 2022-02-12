const resource = '/resumes'
const store = resource
const show = n => resource + '/' + n

const config = cookies => ({
  headers: {
    Authorization: cookies.get('authorization') ?? ''
  }
})

const configStore = cookies => ({
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: cookies.get('authorization') ?? ''
  }
})

export default (context, axios) => ({
  store (data) {
    const bodyFormData = new FormData()
    bodyFormData.append('key', data.key)
    bodyFormData.append('data', data.data)
    bodyFormData.append('image', data.image)
    return axios
      .post(store, bodyFormData, configStore(context.$cookies))
  },

  show (data) {
    return axios.post(show(data), {}, config(context.$cookies))
  }
})
