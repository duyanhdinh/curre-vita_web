export default context => ({
  up: n => context.store.dispatch('resume/edit/paragraphUp', n),
  down: n => context.store.dispatch('resume/edit/paragraphDown', n),
  add: n => context.store.dispatch('resume/edit/paragraphAdd', n),
  remove: n => context.store.dispatch('resume/edit/paragraphRemove', n),
  type: n => context.store.dispatch('resume/edit/paragraphChangeType', n),
  text: n => context.store.dispatch('resume/edit/paragraphChangeText', n),
  countByType: n => context.store.getters['resume/edit/paragraphCountByType'](n)
})
