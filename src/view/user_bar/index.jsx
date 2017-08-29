import React, {Component} from 'react'
import { Icon } from 'antd'
import userImg from 'public/img/user-img.jpg'
import {getUserInfo, parsePathWithAppPrefix, logout} from 'app/util'
import {Redirect, withRouter} from 'react-router-dom'

@withRouter
class UserBar extends Component {
  handleLogout = () => {
    logout(this.props.history)
    return false
  }

  render () {
    const userInfo = getUserInfo()
    const {name = ''} = userInfo
    if (!name) {
      return <Redirect to={parsePathWithAppPrefix('/login')}>登陆</Redirect>
    }
    return (
      <div>
        <span style={{paddingLeft: `30px`}} className='fl'>今天是2017年8月5日 星期六 欢迎使用设备健康管理系统！</span>
        <div className='sign-out fr'>
          <a onClick={this.handleLogout}>退出 <Icon type='poweroff' /></a>
        </div>
        <div className='user-info fr'>
          <img className='fl' src={userImg} />
          <span className='fl'>{name} <Icon type='down' /></span>
        </div>
        <div className='fr order'>
          工单 <i className='number'>1</i>
        </div>
      </div>
    )
  }
}

export default UserBar
