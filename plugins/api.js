import auth from '@/core/api/auth'
import user from '@/core/api/user'
import resume from '@/core/api/resume'

export default (context, inject) => {
  inject('api', {
    auth: auth(context),
    user: user(context),
    resume: resume(context)
  })
}
