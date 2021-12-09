export const setLocale = (state) => {
  state.locale = window.$nuxt.context.app.i18n.locale
}

export const setContent = (state, resume) => {
  state.content = resume?.text_demo
}

export const up = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = n.listIndex[n.listIndex.length - 1]

  if (!index || array.length < 2) { return }

  swap(array, index - 1)
}

export const down = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = n.listIndex[n.listIndex.length - 1]

  if (array.length === index + 1 || array.length < 2) { return }

  swap(array, index)
}

export const add = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = n.listIndex[n.listIndex.length - 1]

  array.splice(index, 0, array[index])
}

export const remove = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = n.listIndex[n.listIndex.length - 1]

  if (array.length > 1) {
    array.splice(index, 1)
  }
}

export const updateType = (state, n) => {
  state.content[n.part][n.index].type = n.value
}

export const updateText = (state, n) => {
  const array = getElementEdit(state, n)
  array[n.key] = n.value
}

const getElementEdit = (state, n) => {
  const array = getArrayEdit(state, n)

  return array[n.listIndex[n.listIndex.length - 1]]
}

const getArrayEdit = (state, n) => {
  let array = state.content[n.part]

  for (let i = 0; i < n.listIndex.length - 1; i++) {
    array = array[n.listIndex[i]].data
  }

  return array
}

const swap = (array, smallIndex, bigIndex = null) => {
  const temp = array[smallIndex]
  if (bigIndex === null) { bigIndex = smallIndex + 1 }
  array.splice(smallIndex, 1, array[bigIndex])
  array.splice(bigIndex, 1, temp)
}
