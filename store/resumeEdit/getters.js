export const numberOfPages = state => [...new Set(state.content?.left?.map(e => e.page).concat(state.content?.right?.map(e => e.page)))].length
export const pageError = state => state.pagesInfo?.find(e => e.error)
export const firstPageContent = state => ({
  info: state.content?.info,
  left: state.content?.left?.filter(e => e.page === 1),
  right: state.content?.right?.filter(e => e.page === 1)
})
export const pagesContentExceptFirst = (state, getters) => {
  const array = []
  for (let i = 2; i <= getters?.numberOfPages; i++) {
    array.push({
      number: i,
      left: state.content?.left?.filter(e => e.page === i),
      right: state.content?.right?.filter(e => e.page === i)
    })
  }
  return array
}
