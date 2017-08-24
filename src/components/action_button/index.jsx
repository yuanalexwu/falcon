import React, {Component} from 'react'
import {noop} from 'app/util'

class ActionButton extends Component {
  render () {
    let {
      icon,
      text,
      onClick = noop
    } = this.props
    icon = `anticon-${icon}`
    return (
      <a className='fr button button-link' onClick={onClick}>
        <i className={icon} />
        {text}
      </a>
    )
  }
}

export default ActionButton
