import auth from '@/api/auth'
import user from '@/api/user'

export default ({ $axios, $authenticate, $auth, $cookies }, inject) => {
  inject('api', {
    auth: auth($axios, $authenticate, $auth),
    user: user($axios, $cookies)
  })
}
