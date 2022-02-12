import auth from '@/core/api/auth'
import user from '@/core/api/user'
import resume from '@/core/api/resume'

const axios = (context) => {
  return context.$axios.create({
    baseURL: context.$config.API_URL
  })
}

export default (context, inject) => {
  inject('api', {
    auth: auth(context, axios(context)),
    user: user(context, axios(context)),
    resume: resume(context, axios(context))
  })
}
