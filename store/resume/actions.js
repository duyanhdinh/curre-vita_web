const getAll = async context => await context.$content('api/cards', { deep: true })?.sortBy('released').fetch()

export const base = async ({ state, commit, dispatch }, context) => {
  await commit('setLocale', context.app.i18n.locale)
  await commit('getAll', await getAll(context))
}

export const initDone = ({ commit }) => {
  commit('initDone')
}

export const init = async ({ state, commit, dispatch }, context) => {
  if (!state.ready || state.locale !== context.app.i18n.locale) {
    await commit('startInit')
    await dispatch('resume/base', context, { root: true })
    await dispatch('resume/search/setListToPick', context, { root: true })
    await dispatch('resume/search/result', context, { root: true })
    await dispatch('resume/color/setCommonColor', context, { root: true })
    await commit('initDone')
  }
}

/* output */
export const outputDone = ({ commit }) => {
  commit('outputDone')
}

export const outputView = ({ commit }) => {
  commit('outputView')
}

export const outputPrint = ({ commit }) => {
  commit('outputPrint')
}
