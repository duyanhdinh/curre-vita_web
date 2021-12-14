export default ({ store, $resumeIaS }, inject) => {
  inject('resumeEdit', {
    add: n => store.dispatch('resumeEdit/add', n),
    down: n => store.dispatch('resumeEdit/down', n),
    editPage: n => store.dispatch('resumeEdit/editPage', n),
    getAvatar: () => store.getters['resumeEdit/avatar'],
    getColorOrigin: n => $resumeIaS.getColorOrigin(n),
    getContent: () => store.state.resumeEdit.content,
    getFirstPageContent: () => store.getters['resumeEdit/firstPageContent'],
    getFontFamily: () => store.getters['resumeEdit/fontFamily'],
    getInfo: () => store.state.resumeEdit.info,
    getLengthItem: n => store.getters['resumeEdit/lengthItem'](n),
    getNumberOfPages: () => store.getters['resumeEdit/numberOfPages'],
    getPageError: () => store.getters['resumeEdit/pageError'],
    getPagesContentExceptFirst: () => store.getters['resumeEdit/pagesContentExceptFirst'],
    getPagesInfo: () => store.state.pagesInfo,
    remove: n => store.dispatch('resumeEdit/remove', n),
    saveAvatarData: n => store.dispatch('resumeEdit/saveAvatarData', n),
    saveAvatarUrl: n => store.dispatch('resumeEdit/saveAvatarUrl', n),
    setContent: n => store.dispatch('resumeEdit/setContent', n),
    up: n => store.dispatch('resumeEdit/up', n),
    updatePersonalColor: n => store.dispatch('resumeEdit/updatePersonalColor', n),
    updatePersonalFontFamily: n => store.dispatch('resumeEdit/updatePersonalFontFamily', n),
    updateText: n => store.dispatch('resumeEdit/updateText', n),
    updateType: n => store.dispatch('resumeEdit/updateType', n)
  })
}
