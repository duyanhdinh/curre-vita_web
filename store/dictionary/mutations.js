export const setLocale = (state) => {
  state.locale = window.$nuxt.context.app.i18n.locale
}

export const setDict = (state, dict) => {
  state.dict = dict
}

export const updating = (state) => {
  state.update = false
}

export const updated = (state) => {
  state.update = true
}
