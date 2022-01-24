export const getByTypeAndName = state => (type, n) => state[type]?.[n]
export const gradientColor = (state, getters) => (n, nature = true) => {
  return {
    '--tw-gradient-from': getters.gradientSpot('from', n, nature),
    '--tw-gradient-to': getters.gradientSpot('to', n, nature),
    '--tw-gradient-stops': getters.gradientSpot('stop', n, nature)
  }
}

export const gradientSpot = (state, getters) => (spot, n, nature = true) => {
  const spotType = {
    from: 'dark',
    to: 'origin',
    stop: 'darkRbga'
  }
  const val = getters.getByTypeAndName(spotType[spot], nature ? getters.getByTypeAndName('nature', n) : n)
  if (spot === 'stop') {
    return `var(--tw-gradient-from), var(--tw-gradient-to, ${val})`
  }
  return val
}
