/**
 * Copyright (c) 2017. Suzhou DHMS Information Technology Co.,Ltd.
 * Author: Wuyuan Created:06/09/2017
 */

export function changeElementUiOrder (newIndex, oldIndex, configList) {
  if (newIndex === oldIndex) {
    return configList
  }
  const tmp = configList[newIndex]
  configList[newIndex] = configList[oldIndex]
  configList[oldIndex] = tmp
  return configList
}

export function changeSubElementUiOrder (type, newList, configList) {
  const graphIdx = configList.findIndex(function (config) {
    const {type: configType = ''} = config
    return type === configType
  })

  // Just return old config if we can't find any element
  if (graphIdx === -1) {
    return configList
  }

  const graph = configList[graphIdx]
  graph.list = newList
  return configList
}

export function getConfigFromListByType (type, configList) {
  let res = []
  for (let config of configList) {
    const {type: configType = '', list = []} = config
    if (type === configType) {
      res = list
      break
    }
  }
  return res
}
