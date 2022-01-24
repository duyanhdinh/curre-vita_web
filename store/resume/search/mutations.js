export const setListToPick = (state, n) => {
  state.listToPick = n
}

export const result = (state, n) => {
  state.result = n
}

export const pick = (state, n) => {
  state.picked[n.key].push(n.val)
}

export const unpick = (state, n) => {
  const index = state.picked[n.key].indexOf(n.val)

  if (index > -1) {
    state.picked[n.key].splice(index, 1)
  }
}

export const word = (state, n) => { state.search = n }
