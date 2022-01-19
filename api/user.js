const resource = '/user/'
const isValid = resource + 'valid'

const config = cookies => ({
  headers: {
    Authorization: cookies.get('authorization') ?? ''
  }
})

export default ($axios, $cookies) => ({
  isValid () {
    return $axios.post(isValid, {}, config($cookies))
  }
})
