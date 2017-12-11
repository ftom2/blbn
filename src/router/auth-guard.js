import store from '../store/store'
export default (to, from, next) => {
  let tokenExists = false
  for (var key in localStorage){
    if (key.includes('firebase:authUser')){
      tokenExists = true
      break
    }
 }
  if (store.getters.user || tokenExists) {
    next()
  } else {
    next('login')
  }
}
