export default context => ({
  set: n => context.store.dispatch('resume/edit/contentSet', n),
  get: () => context.store.state.resume.edit.content
})
