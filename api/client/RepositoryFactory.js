import UserAuthenticationRepository from './repositories/UserAuthenticationRepository'

export default $axios => ({
  auth: UserAuthenticationRepository($axios)
})
