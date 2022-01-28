export const setLocale = (state, n) => {
  state.locale = n
}

export const startInit = (state) => {
  state.ready = false
}

export const initDone = (state) => {
  state.ready = true
}

export const getAll = (state, n) => {
  state.resumes = n
  getImageUrl(state.resumes)
}

/* output */
export const outputDone = (state) => {
  state.outputMode = 0
}

export const outputView = (state) => {
  state.outputMode = 1
}

export const outputPrint = (state) => {
  state.outputMode = 2
}

/* -----helpers function----- */
const getImageUrl = (array) => {
  array.forEach((e) => {
    e.avatar_url = window.$nuxt.context.$config.WEB_URL + '/resume/avatar/' + e.key + '.png'
    e.preview_url = window.$nuxt.context.$config.WEB_URL + '/resume/preview/' + e.key + '.png'
  })
}
