import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {noop} from '../../../util'
import {Icon} from 'antd'
import {resizeEvent as chartResizeEvent} from '../chart/common'
import {resizeEvent as mapResizeEvent} from '../china_map/map/common'

class Wrapper extends Component {
  static propTypes = {
    showExpend: PropTypes.bool,
  }

  static defaultProps = {
    showExpend: false,
    resizeChildren: noop
  }

  constructor (props) {
    super(props)
    this.state = {
      isExpend: false
    }
  }

  handleExpend = () => {
    let {isExpend} = this.state
    isExpend = !isExpend
    this.setState({isExpend}, () => {
      // Resize child size if necessary
      chartResizeEvent.dispatch()
      mapResizeEvent.dispatch()
    })
  }

  render () {
    const {isExpend} = this.state
    const width = '100%'
    const {
      showExpend,
      title = '标题',
      children
    } = this.props
    let wrapperStyle = {
      marginTop: '10px',
      width,
      background: '#fff',
    }
    let headerStyle = {
      padding: '0 15px',
      height: 50,
      width
    }

    if (isExpend) {
      const {clientWidth: width, clientHeight: height} = document.body
      wrapperStyle = {
        ...wrapperStyle,
        marginTop: 0,
        height,
        width,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1
      }
      headerStyle = {
        ...headerStyle,
        width
      }
    }

    return (
      <div className='home-wrapper' style={wrapperStyle}>
        <div style={headerStyle}>
          <div style={{float: 'left', lineHeight: '50px', fontSize: '20px'}}>
            <span
              style={{cursor: 'move'}}
            >
              {title}
            </span>
          </div>
          {
            showExpend
              ? <div style={{float: 'right', lineHeight: '50px', fontSize: '20px'}}>
                <Icon
                  type={isExpend ? 'shrink' : 'arrows-alt'}
                  style={{cursor: 'pointer'}}
                  onClick={this.handleExpend}
                />
              </div>
              : null
          }
          <div style={{clear: 'both'}} />
        </div>
        {children}
      </div>
    )
  }
}

export default Wrapper
