export const init = async ({ commit }) => {
  await commit('init')
}

export const loginData = ({ commit }, n) => {
  commit('loginData', n)
}

export const logout = ({ commit }) => {
  commit('logout')
}
