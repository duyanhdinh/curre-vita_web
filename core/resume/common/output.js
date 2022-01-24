export default context => ({
  getMode: () => context.store.state.resume.outputMode,
  done: () => context.store.dispatch('resume/outputDone'),
  view: () => context.store.dispatch('resume/outputView'),
  print: () => context.store.dispatch('resume/outputPrint')
})
