const takeData = async (locale) => {
  return await window.$nuxt.context.$content('api/search_cv', locale)?.only('data').fetch()
}

export const init = async ({ commit, state }) => {
  commit('setLocale')
  commit('setListSearch', await takeData(state.locale))
}

export const addIn = ({ commit }, n) => {
  commit('addIn', n)
}

export const removeIn = ({ commit }, n) => {
  commit('removeIn', n)
}

export const updateSearch = ({ commit }, n) => {
  commit('updateSearch', n)
}
