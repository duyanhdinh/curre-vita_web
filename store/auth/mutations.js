export const getCookies = () => window.$nuxt.context.$cookies

export const goRoute = () => {
  const cookies = getCookies()
  window.$nuxt._router.push(cookies.get('backward_route') ?? '/')
  cookies.remove('backward_route')
}

export const hideModalAndRedirect = () => {
  const cookies = getCookies()
  const domModal = window.$nuxt.context.$domModal
  domModal.hideAndRedirect({ uri: cookies.get('backward_route') ?? '/' })
  cookies.remove('backward_route')
}

export const init = (state) => {
  const cookies = getCookies()
  if (cookies.get('auth')) { setState(state) }
}

export const login = (state) => {
  setState(state)
  hideModalAndRedirect()
}

export const loginData = (state, n) => {
  saveToken(n)
  setState(state)
  hideModalAndRedirect()
}

export const logout = (state) => {
  removeCookies()
  setState(state)
  goRoute()
}

export const saveToken = (data) => {
  const cookies = getCookies()
  const secure = false
  const sameSite = true
  const maxAge = 7 * 24 * 60 * 60
  const opts = { maxAge, secure, sameSite }
  cookies.set('authorization', 'Bearer ' + data.access_token, opts)
  cookies.set('auth', true, opts)
  cookies.set('user_mail', data.email, opts)
  cookies.set('user_username', data.username, opts)
  cookies.set('user_avatar', data.avatar_url, opts)
  cookies.set('email_verified', data.is_verified, opts)
}

export const setState = (state) => {
  const cookies = getCookies()
  state.auth = cookies.get('auth')
  state.email = cookies.get('user_mail')
  state.username = cookies.get('user_username')
  state.avatar = cookies.get('user_avatar')
}

export const removeCookies = () => {
  const cookies = getCookies()
  const opts = { sameSite: true }
  cookies.remove('authorization', opts)
  cookies.remove('auth', opts)
  cookies.remove('user_mail', opts)
  cookies.remove('user_username', opts)
  cookies.remove('user_avatar', opts)
  cookies.remove('email_verified', opts)
}
