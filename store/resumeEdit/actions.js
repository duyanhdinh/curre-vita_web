const getResume = async (n) => {
  await window.$nuxt.context.$resumeIaS.init()
  return await window.$nuxt.context.$resumeIaS.getResume(n)
}

export const setContent = async ({ commit }, n) => {
  await commit('setContent', await getResume(n))
  commit('updatePagesInfo')
}

export const up = async ({ commit }, n) => {
  await commit('up', n)
  commit('updatePagesInfo')
}

export const down = async ({ commit }, n) => {
  await commit('down', n)
  commit('updatePagesInfo')
}

export const add = async ({ commit }, n) => {
  await commit('add', n)
  commit('updatePagesInfo')
}

export const remove = ({ commit }, n) => {
  commit('remove', n)
}

export const updateType = async ({ commit }, n) => {
  await commit('updateType', n)
  commit('updatePagesInfo')
}

export const updateText = async ({ commit }, n) => {
  await commit('updateText', n)
  commit('updatePagesInfo')
}

export const editPage = ({ commit }, n) => {
  commit('editPage', n)
}
