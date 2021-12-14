const getResume = async (n) => {
  await window.$nuxt.context.$resumeIaS.init()
  return await window.$nuxt.context.$resumeIaS.getResume(n)
}

export const setContent = async ({ commit }, n) => {
  await commit('initData', await getResume(n))
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

export const editPage = async ({ commit }, n) => {
  await commit('editPage', n)
  commit('updatePagesInfo')
}

export const updatePersonalColor = ({ commit }, n) => {
  commit('updatePersonalColor', n)
}

export const updatePersonalFontFamily = ({ commit }, n) => {
  commit('updatePersonalFontFamily', n)
}

export const saveAvatarData = ({ commit }, n) => {
  commit('saveAvatarData', n)
}

export const saveAvatarUrl = ({ commit }, n) => {
  commit('saveAvatarUrl', n)
}
