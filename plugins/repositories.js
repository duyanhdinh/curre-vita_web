import ClientRepository from '@/api/client/RepositoryFactory'

export default ({ axios }, inject) => {
  inject('clientRepo', ClientRepository(axios))
}
