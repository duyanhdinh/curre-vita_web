export default context => ({
  all: () => context.store.getters['resume/edit/personalAll'],
  getAvatar: () => context.store.getters['resume/edit/personalAvatar'],
  getColor: () => context.store.getters['resume/edit/personalColor'],
  getColorDetail: () => context.store.getters['resume/edit/personalColorDetail'],
  getFontFamily: () => context.store.getters['resume/edit/personalFontFamily'],
  saveAvatarData: n => context.store.dispatch('resume/edit/personalStoreAvatarData', n),
  saveAvatarUrl: n => context.store.dispatch('resume/edit/personalStoreAvatarUrl', n),
  updateColor: n => context.store.dispatch('resume/edit/personalUpdateColor', n),
  updateFontFamily: n => context.store.dispatch('resume/edit/personalUpdateFontFamily', n)
})
