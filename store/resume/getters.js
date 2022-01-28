export const resume = state => key => state.ready ? state.resumes.find(x => x.key === key && x.lang === state.locale) : null
