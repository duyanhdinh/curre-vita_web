export default ({ store }, inject) => {
  inject('dictionary', {
    getDict: path => store.dispatch('dictionary/getDict', path),
    dict: () => store.getters['dictionary/dict'],
    title: word => store.getters['dictionary/dict'].title[word],
    mess: word => store.getters['dictionary/dict'].message[word]
  })
}
