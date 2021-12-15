export const setLocale = (state) => {
  state.locale = window.$nuxt.context.app.i18n.locale
}

export const initData = (state, resume) => {
  state.resume = resume
  setInfo(state, resume)
  setContent(state, resume)
}

export const editPage = (state, n) => {
  const array = state.content[n.type].filter(e => e.page === n.page)
  array[array.length - 1].page = n.page + 1
}

export const printDone = (state) => {
  state.printMode = 0
}

export const printing = (state) => {
  state.printMode = 2
}

export const setInfo = (state, resume) => {
  state.info = { ...resume }
  state.info.personal = state.info.data_demo.personal
  delete state.info.data_demo
}

export const setContent = (state, resume) => {
  state.content = { ...resume?.data_demo }
  delete state.content.personal
}

export const updatePersonalColor = (state, n) => {
  state.info.personal.color = n
}

export const updatePersonalFontFamily = (state, n) => {
  state.info.personal.font_family = n
}

export const updatePagesInfo = (state) => {
  state.pagesInfo = [...document.querySelectorAll('div.resume-page')].map(e => ({
    page: parseInt(e.dataset.page),
    type: e.dataset.type,
    error: e.clientHeight > e.dataset.height
  }))
}

export const viewing = (state) => {
  state.printMode = 1
}

/* edit action */
export const up = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])

  if (!index || array.length < 2) { return }

  swap(array, index, index - 1)
}

export const down = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])

  if (array.length === index + 1 || array.length < 2) { return }

  swap(array, index)
}

export const add = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])
  const clone = JSON.parse(JSON.stringify(array[index]))
  generateNewId(clone, 'clone_')

  array.splice(index, 0, clone)
}

export const remove = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])

  if (array.length > 1) {
    array.splice(index, 1)
  }
}

export const updateType = (state, n) => {
  const array = getArrayEdit(state, n)
  const index = getRealIndex(array, n.page, n.listIndex[n.listIndex.length - 1])
  array[index].type = n.value
}

export const updateText = (state, n) => {
  const array = getElementEdit(state, n)
  array[n.key] = n.value
}

export const saveAvatarData = (state, n) => {
  state.info.personal.avatar_data = n
  state.info.personal.avatar_url = URL.createObjectURL(n)
}

export const saveAvatarUrl = (state, n) => {
  state.info.personal.avatar_url = n
}

/* -----helper function----- */
const getRealIndex = (array, page, pageIndex) => {
  let index = 0

  for (let i = 1; i < page; i++) {
    index += array.filter(e => e.page === i).length
  }

  return index + pageIndex
}

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
