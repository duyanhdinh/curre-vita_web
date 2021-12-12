export const colorDark = state => n => state.commonInfo?.color_code?.dark[n]
export const colorDarkRbga = state => n => state.commonInfo?.color_code?.dark_rbga[n]
export const colorOrigin = state => n => state.commonInfo.color_code?.origin[n]
export const gradientColor = (state, getters) => (n) => {
  return {
    '--tw-gradient-from': getters.gradientFrom(n),
    '--tw-gradient-to': getters.gradientTo(n),
    '--tw-gradient-stops': getters.gradientStop(n)
  }
}
export const gradientFrom = (state, getters) => n => getters.colorDark(getters.natureToColor(n))
export const gradientTo = (state, getters) => n => getters.colorOrigin(getters.natureToColor(n))
export const gradientStop = (state, getters) => (n) => {
  const val = getters.colorDarkRbga(getters.natureToColor(n))

  return `var(--tw-gradient-from), var(--tw-gradient-to, ${val})`
}
export const listSearch = state => state.listSearch.data
export const natureToColor = state => n => state.commonInfo?.nature_to_color ? state.commonInfo.nature_to_color[n] : null
export const resume = state => key => state.ready ? state.listResume.find(x => x.key === key) : null
