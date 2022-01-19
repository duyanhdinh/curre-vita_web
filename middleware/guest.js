export default async function ({ $api, redirect }) {
  await $api.user.isValid()
    .then(({ data }) => {
      if (data.msg) {
        /* loggedIn */
        return redirect('/')
      } else {
        /* guest */
      }
    })
    .catch(() => {})
}
