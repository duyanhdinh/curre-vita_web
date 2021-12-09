export default ({ store }, inject) => {
  inject('resumeEdit', {
    setContent: n => store.dispatch('resumeEdit/setContent', n),
    getLeft: () => store.getters['resumeEdit/left'],
    up: n => store.dispatch('resumeEdit/up', n),
    down: n => store.dispatch('resumeEdit/down', n),
    add: n => store.dispatch('resumeEdit/add', n),
    remove: n => store.dispatch('resumeEdit/remove', n),
    updateType: n => store.dispatch('resumeEdit/updateType', n),
    updateText: n => store.dispatch('resumeEdit/updateText', n)
  })
}
