export const setCommonColor = (state, n) => {
  state.nature = n?.nature_to_color
  state.origin = n?.color_code.origin
  state.dark = n?.color_code.dark
  state.darkRbga = n?.color_code.dark_rbga
}
