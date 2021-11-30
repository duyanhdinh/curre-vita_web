const takeDict = async () => {
  return await window.$nuxt.context.$content('dictionary', { deep: true })?.fetch()
}

export const getDict = async ({ commit }) => {
  commit('updating')
  commit('setLocale')
  commit('setDict', await takeDict())
  commit('updated')
}
