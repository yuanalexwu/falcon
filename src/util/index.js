import {
  APP_PATH_PREFIX,
  PLATFORM,
} from '../common'
import {notification} from 'antd'

export function getUserInfo () {
  return {userId: 1, name: '系统管理员'}
}

export function getMenu () {
  return [
        {name: '总览', path: '/', icon: 'home'},
        {name: '统计/分析', path: `/count`, icon: 'line-chart'},
        {name: '设备管理', path: `/device`, icon: 'appstore-o'},
        {name: '系统管理', path: `/system`, icon: 'exception'},
        {name: '消息中心', path: `/news`, icon: 'bell'},
        {name: '基本信息', path: `/basic`, icon: 'solution'},
  ]
}

export function parsePathWithAppPrefix (path) {
  return `${APP_PATH_PREFIX}${path}`
}

export function logout (history) {
  // TODO clear user info and redirect to login page
  history.push(parsePathWithAppPrefix('/login'))
}

export function buildRequestUrl (url, query = {}) {
  if (!url) {
    url = '/'
  }
  const queryList = []
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      queryList.push(`${key}=${query[key]}`)
    }
  }
  queryList.push(`t=${new Date().getTime()}`)
  if (queryList.length) {
    const queryStr = queryList.join('&')
    url = `${url}?${queryStr}`
  }

  return url
}

export function noop () {}

export function warnNotification ({description = '', message = '提示', duration = 8}) {
  notification.warning({
    message, description, duration
  })
}

export function addApiExtraPostInfo (data = {}) {
  const userInfo = getUserInfo()
  data.user_id = userInfo.userId
  data.platform = PLATFORM
  return data
}

export function isArray (obj) {
  return _callObjectPrototypeToString(obj, '[object Array]')
}

export function isFunc (obj) {
  return _callObjectPrototypeToString(obj, '[object Function]')
}

export function isNull (obj) {
  return _callObjectPrototypeToString(obj, '[object Null]')
}

function _callObjectPrototypeToString (obj, rst) {
  return Object.prototype.toString.call(obj) === rst
}

export function getRemoveFromLs (item, defaultValue) {
  if (!item) {
    return defaultValue
  }
  const {localStorage: ls} = window
  const value = ls.getItem(item)
  if (!isNull(value)) {
    ls.removeItem(item)
    return value
  }
  return defaultValue
}
