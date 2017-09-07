import * as ActionTypes from '../constant'

export default function home (state = {}, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_HOME_CONFIG_SUCCESS : {
      const {configList = []} = action
      return {...state, configList}
    }
    case ActionTypes.GET_HOME_DATA_SUCCESS : {
      const {configData = []} = action
      return {...state, configData}
    }
    default: {
      return state
    }
  }
}
