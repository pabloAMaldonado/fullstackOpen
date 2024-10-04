
const postLogout = (event, key) => {
  event.preventDefault()
  window.localStorage.removeItem(key)
  window.location.reload()
}

export default postLogout
