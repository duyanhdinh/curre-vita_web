export default context => ({
  update: n => context.store.dispatch('resume/edit/pagesUpdate', n),
  count: () => context.store.getters['resume/edit/pagesCount'],
  errorPage: () => context.store.getters['resume/edit/pageError'],
  info: () => context.store.state.resume.edit.pagesInfo,
  content: (firstPage = false) => context.store.getters['resume/edit/pageContent'](firstPage)
})
