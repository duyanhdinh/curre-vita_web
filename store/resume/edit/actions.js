/* Edit */
export const init = async ({ dispatch, commit, rootGetters }, payload) => {
  await dispatch('resume/init', payload.context, { root: true })
  const resumeEdit = await rootGetters['resume/resume'](payload.n)
  commit('setResume', resumeEdit)
  commit('contentSet', resumeEdit)
  commit('personalSet', resumeEdit)
}

/* Content */
export const contentSet = async ({ commit, getters }, n) => {
  commit('contentSet', await getters['resume/resume'](n))
}

/* Paragraph */
export const paragraphAdd = async ({ commit }, n) => {
  await commit('paragraphAdd', n)
  commit('pagesInfoUpdate')
}

export const paragraphDown = async ({ commit }, n) => {
  await commit('paragraphDown', n)
  commit('pagesInfoUpdate')
}

export const paragraphUp = async ({ commit }, n) => {
  await commit('paragraphUp', n)
  commit('pagesInfoUpdate')
}

export const paragraphRemove = async ({ commit }, n) => {
  await commit('paragraphRemove', n)
  commit('pagesInfoUpdate')
}

export const paragraphChangeType = async ({ commit }, n) => {
  await commit('paragraphChangeType', n)
  commit('pagesInfoUpdate')
}

export const paragraphChangeText = async ({ commit }, n) => {
  await commit('paragraphChangeText', n)
  commit('pagesInfoUpdate')
}

/* Pages */
export const pagesUpdate = async ({ commit }, n) => {
  await commit('pagesUpdate', n)
  commit('pagesInfoUpdate')
}

/* Personal */
export const personalStoreAvatarData = ({ commit }, n) => {
  commit('personalStoreAvatarData', n)
}

export const personalStoreAvatarUrl = ({ commit }, n) => {
  commit('personalStoreAvatarUrl', n)
}

export const personalUpdateColor = ({ commit }, n) => {
  commit('personalUpdateColor', n)
}

export const personalUpdateFontFamily = async ({ commit }, n) => {
  await commit('personalUpdateFontFamily', n)
  commit('pagesInfoUpdate')
}
