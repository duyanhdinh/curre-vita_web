export default ({ store }, inject) => {
  inject('domModal', {
    setModalReady: n => store.dispatch('dom/modal/setModalReady', n),
    openModalOrRedirect: n => store.dispatch('dom/modal/openModalOrRedirect', n),
    show: n => store.dispatch('dom/modal/show', n),
    hide: () => store.dispatch('dom/modal/hide'),
    isModalReady: n => store.getters['dom/modal/isModalReady'](n),
    hideAndRedirect: n => store.dispatch('dom/modal/hideAndRedirect', n),
    hideAndRedirectBack: n => store.dispatch('dom/modal/hideAndRedirectBack', n)
  })
}
