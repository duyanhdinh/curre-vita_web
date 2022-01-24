const getCommonColor = async (context) => {
  return await context.$content('api/resume_info', 'color')?.fetch()
}

export const setCommonColor = async ({ commit, state }, context) => {
  commit('setCommonColor', await getCommonColor(context))
}
