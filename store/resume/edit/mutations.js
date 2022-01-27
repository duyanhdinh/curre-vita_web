/* Edit */
export const setResume = (state, resume) => {
  state.resume = { ...resume }
  delete state.resume.data_demo
}

/* Content */
export const contentSet = (state, n) => {
  state.content = n
}

/* Personal */
export const personalSet = (state, n) => {
  state.personal = n
}

export const personalStoreAvatarData = (state, n) => {
  state.personal.avatar_data = n
  state.personal.avatar_url = URL.createObjectURL(n)
}

export const personalStoreAvatarUrl = (state, n) => {
  state.personal.avatar_url = n
}

export const personalUpdateColor = (state, n) => {
  state.personal.color = n
}

export const personalUpdateFontFamily = (state, n) => {
  state.personal.font_family = n
}

/* Paragraph */
export const paragraphAdd = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])
  const clone = JSON.parse(JSON.stringify(array[index]))
  generateNewId(clone, 'clone_')

  array.splice(index, 0, clone)
}

export const paragraphDown = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])

  if (array.length === index + 1 || array.length < 2) { return }

  swap(array, index)
}

export const paragraphUp = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])

  if (!index || array.length < 2) { return }

  swap(array, index, index - 1)
}

export const paragraphRemove = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])

  if (array.length > 1) {
    array.splice(index, 1)
  }
}

export const paragraphChangeType = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])
  array[index].type = n.value
}

export const paragraphChangeText = (state, n) => {
  const array = getElementEdit(state, n)
  array[n.key] = n.value
}

/* Pages */
export const pagesInfoUpdate = (state) => {
  state.pagesInfo = [...document.querySelectorAll('div.resume-page')].map(e => ({
    page: parseInt(e.dataset.page),
    type: e.dataset.type,
    error: e.clientHeight > e.dataset.height
  }))
}

export const pagesUpdate = (state, n) => {
  const array = state.content[n.type].filter(e => e.page === n.page)
  array[array.length - 1].page = n.page + 1
}

/* -----helper function----- */
const getElementEdit = (state, n) => {
  if (n.part === 'info') {
    return state.content[n.part]
  } else {
    const array = getArrayEdit(state, n)
    const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])

    return array[index]
  }
}

const getArrayEdit = (state, n) => {
  let array = state.content[n.part]

  for (let i = 0; i < n.listIndex.length - 1; i++) {
    let index = n.listIndex[i]
    if (i === 0) {
      index = getRealIndex(array, n.page, index)
    }
    array = array[index].data
  }

  return array
}

const getRealIndex = (array, page, pageIndex) => {
  let index = 0

  for (let i = 1; i < page; i++) {
    index += array.filter(e => e.page === i).length
  }

  return index + pageIndex
}

const generateNewId = (clone, prefix) => {
  if (clone.data !== undefined) {
    clone.data.forEach((v, k) => generateNewId(v, `${prefix}${k}_`))
  }

  clone.id = window.$nuxt.context.$_.uniqueId(prefix)
}

const swap = (array, oldIndex, newIndex = null) => {
  if (newIndex === null) { newIndex = oldIndex + 1 }

  const temp = array[oldIndex]
  if (temp.page) { temp.page = array[newIndex].page }
  array.splice(oldIndex, 1, array[newIndex])
  array.splice(newIndex, 1, temp)
}
