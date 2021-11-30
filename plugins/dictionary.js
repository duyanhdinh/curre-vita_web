export default ({ store }, inject) => {
  inject('dictionary', {
    getDict: () => store.dispatch('dictionary/getDict'),
    dict: key => store.getters['dictionary/dict'](key),
    title: word => store.getters['dictionary/dict'].title[word],
    mess: word => store.getters['dictionary/dict'].message[word],
    name: () => store.getters['dictionary/dict'].name
  })
}
