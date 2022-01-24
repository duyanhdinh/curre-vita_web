/* Pages */
export const pagesCount = state => [...new Set(state.content?.left?.map(e => e.page).concat(state.content?.right?.map(e => e.page)))].length
export const pageError = state => state.pagesInfo?.find(e => e.error)
export const pageContent = (state, getters) => (firstPage = false) => {
  if (firstPage) {
    return {
      info: state.content?.info,
      left: state.content?.left?.filter(e => e.page === 1),
      right: state.content?.right?.filter(e => e.page === 1)
    }
  }

  const array = []
  for (let i = 2; i <= getters?.pagesCount; i++) {
    array.push({
      number: i,
      left: state.content?.left?.filter(e => e.page === i),
      right: state.content?.right?.filter(e => e.page === i)
    })
  }
  return array
}

/* Paragraph */
export const paragraphCountByType = state => n => state.content?.[n].length

/* Personal */
export const personalAll = state => state.personal
export const personalAvatar = state => state.personal?.avatar_url ?? state.resume?.avatar_url
export const personalColor = state => state.personal?.color
export const personalColorDetail = state => state.resume?.detail_color ? state.resume.detail_color[state.personal?.color] : null
export const personalFontFamily = state => state.personal?.font_family

/* Info */
export const infoName = state => state.resume?.name
export const infoAll = state => state.resume
