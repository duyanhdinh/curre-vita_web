import auth from '@/core/api/auth'
import user from '@/core/api/user'

export default ({ $axios, $authenticate, $auth, $cookies }, inject) => {
  inject('api', {
    auth: auth($axios, $authenticate, $auth),
    user: user($axios, $cookies)
  })
}
