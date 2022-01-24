import color from '@/core/resume/common/color'
import search from '@/core/resume/common/search'
import edit from '@/core/resume/common/edit'
import output from '@/core/resume/common/output'
// import britishShorthair from '@/core/resume/british_shorthair'

export default (context, inject) => {
  inject('resume', {
    /* common */
    init: () => context.store.dispatch('resume/init', context),
    getByKey: n => context.store.getters['resume/resume'](n),
    color: color(context),
    search: search(context),
    edit: edit(context),
    output: output(context)
    // /* resume */
    // british_shorthair: britishShorthair(context.store)
  })
}
