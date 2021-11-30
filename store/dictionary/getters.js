export const dict = state => (key) => {
  return state.update ? state.dict.find(x => x.lang === state.locale && x.key === key) : null
}
