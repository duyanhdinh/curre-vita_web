/* Edit */
export const init = async ({ dispatch, commit, rootGetters }, payload) => {
  await dispatch('resume/init', payload.context, { root: true })
  let serverData = null
  await payload.context.$api.resume.show(payload.n)
    .then(({ data }) => {
      serverData = data
    })

  const resumeEdit = await rootGetters['resume/resume'](payload.n)
  commit('setResume', resumeEdit)

  if (serverData) {
    if (!serverData.personal.color) { serverData.personal.color = resumeEdit?.data_demo.personal.color }

    commit('contentSet', { ...serverData.content })
    commit('personalSet', { ...serverData.personal })
  } else {
    const content = { ...resumeEdit?.data_demo }
    delete content.personal

    commit('contentSet', content)
    commit('personalSet', { ...resumeEdit?.data_demo.personal })
  }
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
