export default ({ store, $resumeIaS }, inject) => {
  inject('resumeEdit', {
    setContent: n => store.dispatch('resumeEdit/setContent', n),
    getPageError: () => store.getters['resumeEdit/pageError'],
    getNumberOfPages: () => store.getters['resumeEdit/numberOfPages'],
    getFirstPageContent: () => store.getters['resumeEdit/firstPageContent'],
    getContent: () => store.state.resumeEdit.content,
    getInfo: () => store.state.resumeEdit.info,
    getPagesContentExceptFirst: () => store.getters['resumeEdit/pagesContentExceptFirst'],
    up: n => store.dispatch('resumeEdit/up', n),
    down: n => store.dispatch('resumeEdit/down', n),
    add: n => store.dispatch('resumeEdit/add', n),
    remove: n => store.dispatch('resumeEdit/remove', n),
    updateType: n => store.dispatch('resumeEdit/updateType', n),
    updateText: n => store.dispatch('resumeEdit/updateText', n),
    editPage: n => store.dispatch('resumeEdit/editPage', n),
    updatePersonalColor: n => store.dispatch('resumeEdit/updatePersonalColor', n),
    updatePersonalFontFamily: n => store.dispatch('resumeEdit/updatePersonalFontFamily', n),
    getColorOrigin: n => $resumeIaS.getColorOrigin(n)
  })
}
