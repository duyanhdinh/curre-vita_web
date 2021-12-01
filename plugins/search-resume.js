export default ({ store }, inject) => {
  inject('searchResume', {
    init: n => store.dispatch('search_resume/init', n),
    add: n => store.dispatch('search_resume/addIn', n),
    remove: n => store.dispatch('search_resume/removeIn', n),
    getList: () => store.getters['search_resume/listSearch'],
    search: () => store.state.search_resume.search,
    updateSearch: n => store.dispatch('search_resume/updateSearch', n)
  })
}
