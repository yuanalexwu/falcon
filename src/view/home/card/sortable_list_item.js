/**
 * Copyright (c) 2017. Suzhou DHMS Information Technology Co.,Ltd.
 * Author: Wuyuan Created:07/09/2017
 */
import React, {Component} from 'react'
import {sortable} from 'react-sortable'

@sortable
class SortableListItem extends Component {
  render () {
    const {children, ...restProps} = this.props
    return (
      <div {...restProps} className=''>{children}</div>
    )
  }
}

export default SortableListItem
