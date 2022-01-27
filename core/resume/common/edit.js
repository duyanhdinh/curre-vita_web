import info from '@/core/resume/common/edit/info'
import content from '@/core/resume/common/edit/content'
import paragraph from '@/core/resume/common/edit/paragraph'
import pages from '@/core/resume/common/edit/pages'
import personal from '@/core/resume/common/edit/personal'

export default context => ({
  init: n => context.store.dispatch('resume/edit/init', { n, context }),
  info: info(context),
  content: content(context),
  paragraph: paragraph(context),
  pages: pages(context),
  personal: personal(context),
  exportData: () => context.store.getters['resume/edit/exportData']
})
