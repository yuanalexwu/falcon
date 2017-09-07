/**
 * Copyright (c) 2017. Suzhou DHMS Information Technology Co.,Ltd.
 * Author: Wuyuan Created:24/08/2017
 */
import * as ActionType from '../constant'
import baseFetch from './base_fetch'
import {
  warnNotification,
  addApiExtraPostInfo,
} from '../util'

export function getHomeConfig () {
  return dispatch => {
    const url = '/api/home'
    const data = addApiExtraPostInfo({action: 'getHomeConfig'})
    const option = {
      url,
      data,
      success: res => {
        const {data: configList = []} = res
        const action = {
          type: ActionType.GET_HOME_CONFIG_SUCCESS,
          configList
        }
        dispatch(action)
      },
      error: description => {
        warnNotification({description})
      }
    }
    baseFetch(option, dispatch)
  }
}

export function getHomeData () {
  return dispatch => {
    const url = '/api/home'
    const data = addApiExtraPostInfo({action: 'getHomeData'})
    const option = {
      url,
      data,
      success: res => {
        const {data: configData = {}} = res
        const action = {
          type: ActionType.GET_HOME_DATA_SUCCESS,
          configData
        }
        dispatch(action)
      },
      error: description => {
        warnNotification({description})
      }
    }
    baseFetch(option, dispatch)
  }
}

export function changeUiCardOrder (newIndex, oldIndex) {
  console.log('changeUiCardOrder() ', {newIndex, oldIndex})
  return dispatch => {
    // const action = {
    //   type: ActionType.CHANGE_HOME_UI_CARD_ORDER,
    //   newIndex,
    //   oldIndex
    // }
    // dispatch(action)
  }
}
