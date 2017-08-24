import React, {Component} from 'react'
import './index.css'

class NoData extends Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.text !== this.props.text
  }

  render () {
    const {text = '无数据'} = this.props
    return (
      <div className='no-data-wrapper'>{text}</div>
    )
  }
}

export default NoData
