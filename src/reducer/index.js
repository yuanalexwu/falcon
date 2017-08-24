import { combineReducers } from 'redux'
import home from './home'
import base from './base'

const reducer = combineReducers({
  home,
  base
})

export default reducer
