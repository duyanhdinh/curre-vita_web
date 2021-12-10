export default ({ store }, inject) => {
  inject('resumeEdit', {
    setContent: n => store.dispatch('resumeEdit/setContent', n),
    getPageError: () => store.getters['resumeEdit/pageError'],
    getNumberOfPages: () => store.getters['resumeEdit/numberOfPages'],
    getFirstPageContent: () => store.getters['resumeEdit/firstPageContent'],
    getContent: () => store.state.resumeEdit.content,
    getPagesContentExceptFirst: () => store.getters['resumeEdit/pagesContentExceptFirst'],
    up: n => store.dispatch('resumeEdit/up', n),
    down: n => store.dispatch('resumeEdit/down', n),
    add: n => store.dispatch('resumeEdit/add', n),
    remove: n => store.dispatch('resumeEdit/remove', n),
    updateType: n => store.dispatch('resumeEdit/updateType', n),
    updateText: n => store.dispatch('resumeEdit/updateText', n),
    editPage: n => store.dispatch('resumeEdit/editPage', n)
  })
}
