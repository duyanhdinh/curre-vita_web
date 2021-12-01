export const setLocale = (state) => {
  state.locale = window.$nuxt.context.app.i18n.locale
}

export const setListSearch = (state, n) => {
  state.listSearch = n
}

export const addIn = (state, n) => {
  state.in[n.key].push(n.val)
}

export const removeIn = (state, n) => {
  const index = state.in[n.key].indexOf(n.val)

  if (index > -1) {
    state.in[n.key].splice(index, 1)
  }
}

export const updateSearch = (state, n) => {
  state.search = n
}
