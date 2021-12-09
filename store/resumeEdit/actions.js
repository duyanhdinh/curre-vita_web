const getResume = async (n) => {
  await window.$nuxt.context.$resumeIaS.init()
  return await window.$nuxt.context.$resumeIaS.getResume(n)
}

export const setContent = async ({ commit }, n) => {
  commit('setContent', await getResume(n))
}

export const up = ({ commit }, n) => {
  commit('up', n)
}

export const down = ({ commit }, n) => {
  commit('down', n)
}

export const add = ({ commit }, n) => {
  commit('add', n)
}

export const remove = ({ commit }, n) => {
  commit('remove', n)
}

export const updateType = ({ commit }, n) => {
  commit('updateType', n)
}

export const updateText = ({ commit }, n) => {
  commit('updateText', n)
}
