import { createStore, combineReducers } from 'redux'
import { chatReducer } from './Chat.js'
import { showReducer } from './Show.js'

const root = combineReducers({
  chat: chatReducer,
  show: showReducer
})

export const store = createStore(root)
