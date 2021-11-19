export const setModalReady = ({ commit }, modal) => {
  commit('setModalReady', modal)
}

export const closeModalTo = ({ commit }, payLoad) => {
  commit('closeModalTo', payLoad)
}

export const openModal = ({ commit }, payLoad) => {
  commit('openModal', payLoad)
}
