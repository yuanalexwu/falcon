import React, {Component} from 'react'
import { Icon } from 'antd'

class Pie extends Component {
  render () {
    return (
      <div className='frame-box' style={{height: 379}}>
        <div className='small-title'>
          设备状态
          <Icon type='arrows-alt' style={{float: 'right'}} />
        </div>
      </div>
    )
  }
}

export default Pie
