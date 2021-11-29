const takeDict = async (path, locale) => {
  return await window.$nuxt.context.$content(path, locale)?.fetch()
}

export const getDict = async ({ state, commit }, path) => {
  commit('updating')
  commit('setLocale')
  commit('setDict', await takeDict('dictionary/' + path, state.locale))
  commit('updated')
}
