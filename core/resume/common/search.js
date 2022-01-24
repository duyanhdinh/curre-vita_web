export default context => ({
  pick: n => context.store.dispatch('resume/search/action', { n, context, action: 'pick' }),
  unpick: n => context.store.dispatch('resume/search/action', { n, context, action: 'unpick' }),
  word: n => context.store.dispatch('resume/search/action', { n, context, action: 'word' }),
  result: () => context.store.state.resume.search.result,
  listToPick: () => context.store.state.resume.search.listToPick.data
})
