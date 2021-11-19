export const isModalReady = state => (modal) => {
  return state.modals.includes(modal) && modal !== ''
}
