export default context => ({
  all: () => context.store.getters['resume/edit/infoAll'],
  name: () => context.store.getters['resume/edit/infoName']
})
