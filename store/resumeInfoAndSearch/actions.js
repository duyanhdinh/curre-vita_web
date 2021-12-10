const takeListSearch = async (locale) => {
  return await window.$nuxt.context.$content('api/search_cv', locale)?.only('data').fetch()
}

const takeListResume = async (state) => {
  const where = { lang: state.locale }

  if (state.in.color.length) { where.colors = { $containsAny: state.in.color } }
  if (state.in.nature.length) { where.nature = { $containsAny: state.in.nature } }

  return await window.$nuxt.context
    .$content('api/cards', { deep: true })?.where(where)
    .search(state.search)
    .sortBy('released')
    .fetch()
}

const takeCommonInfo = async () => {
  return await window.$nuxt.context.$content('api/resume_info', 'common')?.fetch()
}

export const init = async ({ commit, state }) => {
  if (!state.ready) {
    commit('setLocale')
    commit('setListSearch', await takeListSearch(state.locale))
    commit('setListResume', await takeListResume(state))
    commit('setCommonInfo', await takeCommonInfo())
    commit('settingDone')
  }
}

export const addIn = async ({ commit, state }, n) => {
  commit('addIn', n)
  commit('setListResume', await takeListResume(state))
}

export const removeIn = async ({ commit, state }, n) => {
  commit('removeIn', n)
  commit('setListResume', await takeListResume(state))
}

export const updateSearch = async ({ commit, state }, n) => {
  commit('updateSearch', n)
  commit('setListResume', await takeListResume(state))
}
