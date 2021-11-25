export function setModalReady (state, modal) {
  state.modals.push(modal)
}

export function closeModalTo (state, payLoad) {
  if (state.opening === payLoad.modal) {
    window.$nuxt.context.$modal.hide(state.opening)
    state.opening = ''
    window.$nuxt._router.push(payLoad.uri)
  }
}

export function openModal (state, payLoad) {
  if (window.$nuxt._route.fullPath !== payLoad.uri) { window.$nuxt._router.push(payLoad.uri) }

  state.opening = payLoad.modal
  window.$nuxt.context.$modal.show(payLoad.modal, payLoad.params ?? null)
}
