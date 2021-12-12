export default ({ store }, inject) => {
  inject('resumeIaS', {
    init: () => store.dispatch('resumeInfoAndSearch/init'),
    add: n => store.dispatch('resumeInfoAndSearch/addIn', n),
    remove: n => store.dispatch('resumeInfoAndSearch/removeIn', n),
    getListSearch: () => store.getters['resumeInfoAndSearch/listSearch'],
    updateSearch: n => store.dispatch('resumeInfoAndSearch/updateSearch', n),
    getListResume: () => store.state.resumeInfoAndSearch.listResume,
    getResume: n => store.getters['resumeInfoAndSearch/resume'](n),
    getGradientColor: n => store.getters['resumeInfoAndSearch/gradientColor'](n),
    getColorOrigin: n => store.getters['resumeInfoAndSearch/colorOrigin'](n)
  })
}
