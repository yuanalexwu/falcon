import React, { Component } from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { getUserInfo, getMenu, parsePathWithAppPrefix } from 'app/util'
import Home from 'app/view/home'
import NoMatch from 'app/view/no_match'
import Loading from 'app/components/loading'
import UserBar from 'app/view/user_bar'
import logo from 'public/img/logo.png'

import './index.scss'

const {Header, Content, Footer, Sider} = Layout
const {Item} = Menu

class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    if (this.timeoutId) {
      return
    }
    this.timeoutId = setTimeout(() => {
      this.forceUpdate()
      this.timeoutId = undefined
    }, 300)
  }

  toggleCollapse = () => {
    this.setState({collapsed: !this.state.collapsed})
  }

  getMenuInfo = (collapsed, currentPath) => {
    const menus = getMenu()
    let selectedKey = ''
    const menuItems = menus.map((menu, idx) => {
      let {name, path, icon} = menu
      path = parsePathWithAppPrefix(path)
      const homePath = parsePathWithAppPrefix('/')
      if (currentPath.indexOf(path) !== -1) {
        if (path === homePath) {
          if (this.isMatchHomePath(currentPath, path, homePath)) {
            selectedKey = `${idx}`
          }
        } else {
          selectedKey = `${idx}`
        }
      }
      const iconStyle = {
        fontSize: collapsed ? '1.5em' : '1em',
        transition: 'all .3s'
      }
      const menuName = !collapsed ? <span>{name}</span> : null
      const selectedLineStyle = {
        position: 'absolute',
        width: 5,
        height: 58,
        marginLeft: -24,
        background: '#389EFF'
      }
      return (
        <Item key={idx}>
          {
            selectedKey === `${idx}`
              ? <div style={selectedLineStyle} />
              : null
          }
          <Link to={path}>
            <Icon type={icon} style={iconStyle} />
            {menuName}
          </Link>
        </Item>
      )
    })
    return {menuItems, selectedKey}
  }

  isMatchHomePath = (currentPath, path, homePath) => {
    return currentPath === homePath && path === homePath
  }

  getContentHeight = () => {
    const windowHeight = document.body.clientHeight
    const headerBarHeight = 64
    const contentHeight = 24
    const footerBarHeight = 66
    return windowHeight - headerBarHeight - contentHeight - footerBarHeight
  }

  render () {
    const userInfo = getUserInfo()
    if (!userInfo) {
      return <Redirect to={parsePathWithAppPrefix('/login')} />
    }
    const {collapsed} = this.state
    const {location = {}} = this.props
    const {pathname: currentPath = ''} = location
    const minHeight = this.getContentHeight()
    const {menuItems, selectedKey} = this.getMenuInfo(collapsed, currentPath)
    const logoImg = collapsed ? 'D' : <img src={logo} />
    return (
      <Layout className='dan-dhms'>
        <Loading />
        <Sider
          breakpoint='lg'
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Link to={parsePathWithAppPrefix('/')}>
            <div className='root-logo'>{logoImg}</div>
          </Link>
          <Menu theme='dark' mode='inline' selectedKeys={[selectedKey]}>
            {menuItems}
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <span className='menu-trigger'>
              <Icon
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggleCollapse}
                className='root-side-trigger'
              />
            </span>
            <UserBar />
          </Header>
          <Content style={{margin: `0 30px`}}>
            <div style={{minHeight, overflow: 'hidden'}}>
              <Switch>
                <Route exact path={parsePathWithAppPrefix('/')} component={Home} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Content>
          <Footer style={{textAlign: 'left'}} className='footer'>
            DHMS ©2017 Use Antd
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Root
