export const setModalReady = ({ commit }, modal) => {
  commit('setModalReady', modal)
}

export const openModalOrRedirect = ({ commit }, payLoad) => {
  commit('openModalOrRedirect', payLoad)
}

export const show = ({ commit }, payLoad) => {
  commit('show', payLoad)
}

export const hide = ({ commit }) => {
  commit('hide')
  commit('canDoAnotherAction')
}

export const hideAndRedirect = ({ commit, state }, payLoad) => {
  if (!state.preventAction) {
    commit('stopAnotherAction')
    commit('hide')
    commit('redirect', payLoad)
  } else {
    commit('canDoAnotherAction')
  }
}

export const hideAndRedirectBack = ({ commit, state }, payLoad) => {
  if (!state.preventAction) {
    commit('hide')
    commit('redirect', payLoad)
  }
  commit('canDoAnotherAction')
}
