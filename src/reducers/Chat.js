const NEW_CHAT = "NEW_CHAT", REMOVE_CHAT = "REMOVE_CHAT"

export const chatReducer = (state = {}, action) => {
  switch(action.type) {
    case NEW_CHAT:
      return { ...action.payload }
    case REMOVE_CHAT:
      return {}
    default:
      return state
  }
}
