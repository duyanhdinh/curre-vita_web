export default ({ store }, inject) => {
  inject('dictionary', {
    init: () => store.dispatch('dictionary/init'),
    dict: key => store.getters['dictionary/dict'](key),
    title: word => store.getters['dictionary/dict'].title[word],
    name: () => store.getters['dictionary/dict'].name
  })
}
