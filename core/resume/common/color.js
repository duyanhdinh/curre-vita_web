export default context => ({
  nature: n => context.store.getters['resume/color/getByTypeAndName']('nature', n),
  origin: n => context.store.getters['resume/color/getByTypeAndName']('origin', n),
  dark: n => context.store.getters['resume/color/getByTypeAndName']('dark', n),
  darkRbga: n => context.store.getters['resume/color/getByTypeAndName']('darkRbga', n),
  gradient: n => context.store.getters['resume/color/gradientColor'](n, false),
  gradientNature: n => context.store.getters['resume/color/gradientColor'](n)
})
