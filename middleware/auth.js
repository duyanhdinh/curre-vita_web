export default async function ({ $api, redirect }) {
  await $api.user.isValid()
    .then(({ data }) => {
      if (data.msg) {
        /* loggedIn */
      } else {
        /* guest */
        return redirect('/login')
      }
    })
    .catch(() => {
      return redirect('/')
    })
}
