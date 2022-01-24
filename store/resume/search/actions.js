const getListResume = async (state, context) => {
  const where = { lang: context.app.i18n.locale }

  if (state.picked.color.length) { where.colors = { $containsAny: state.picked.color } }
  if (state.picked.nature.length) { where.nature = { $containsAny: state.picked.nature } }

  return await context.$content('api/cards', { deep: true })?.where(where)
    .search(state.search)
    .sortBy('released')
    .fetch()
}

const getListToPick = async (context) => {
  return await context.$content('api/search_cv', context.app.i18n.locale)?.only('data').fetch()
}

export const setListToPick = async ({ commit }, context) => {
  commit('setListToPick', await getListToPick(context))
}

export const result = async ({ commit, state }, context) => {
  commit('result', await getListResume(state, context))
}

export const action = async ({ dispatch, commit }, payload) => {
  await commit(payload.action, payload.n)
  dispatch('result', payload.context)
}
