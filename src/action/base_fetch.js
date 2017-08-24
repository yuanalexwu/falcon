import {noop, isFunc, parsePathWithAppPrefix} from 'app/util'
import {
  POST,
  STATUS_SUCCESS,
} from '../common'
import * as ActionType from '../constant'
import { default as apiConfig } from 'app/config'

const {apiUrl} = apiConfig

function baseFetch (option, dispatch) {
  let {
    url,
    data = {},
    success = noop,
    error = noop,
    method = POST
  } = option

  // Parse host or prefix for all api url
  if (apiUrl) {
    // If we got a new apiUrl, just prepend it to the url,
    // and it's not necessary to add `app prefix` to a new api
    // url
    url = `${apiUrl}${url}`
  } else {
    url = parsePathWithAppPrefix(url)
  }

  const fetchOption = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (method === POST) {
    fetchOption.body = JSON.stringify(data)
  }

  dispatch({type: ActionType.SHOW_LOADING})

  // eslint-disable-next-line
  fetch(url, fetchOption).then(data => {
    dispatch({type: ActionType.HIDE_LOADING})
    return data.json()
  }).then(res => {
    const {status, msg = '', devmsg = ''} = res
    if (status === STATUS_SUCCESS) {
      if (isFunc(success)) success(res)
    } else {
      if (isFunc(error)) {
        error(msg, status)
      }
      console.log(devmsg)
    }
  }).catch(err => {
    dispatch({type: ActionType.HIDE_LOADING})
    const {message = ''} = err
    if (isFunc(error)) error(message)
  })
}

export default baseFetch
