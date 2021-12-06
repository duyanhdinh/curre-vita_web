export function setModalReady (state, modal) {
  state.modals.push(modal)
}

export function openModalOrRedirect (state, payLoad) {
  if (window.$nuxt._route.fullPath !== payLoad.uri) { window.$nuxt._router.push(payLoad.uri) }

  state.opening = payLoad.modal
  window.$nuxt.context.$modal.show(payLoad.modal, payLoad.params ?? null)
}

export function show (state, payLoad) {
  state.opening = payLoad.modal
  window.$nuxt.context.$modal.show(payLoad.modal, payLoad.params ?? null)
}

export function hide (state) {
  window.$nuxt.context.$modal.hide(state.opening)
  state.opening = ''
}

export function stopAnotherAction (state) {
  state.preventAction = true
}

export function canDoAnotherAction (state) {
  state.preventAction = false
}

export function redirect (state, payLoad) {
  window.$nuxt._router.push(payLoad.uri, payLoad.params ?? null)
}
