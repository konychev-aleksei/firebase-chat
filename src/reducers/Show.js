const SHOW = "SHOW", HIDE = "HIDE"

export const showReducer = (state = false, action) => {
  switch(action.type) {
    case SHOW:
      return true
    case HIDE:
      return false
    default:
      return state
  }
}
