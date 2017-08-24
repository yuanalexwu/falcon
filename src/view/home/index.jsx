import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getHomeConfig} from '../../action/home'

function mapStateToProps (state) {
  const {home = {}} = state
  const {configList = []} = home
  return {configList}
}

function mapDispatchToProps (dispatch) {
  return {
    getHomeConfig: bindActionCreators(getHomeConfig, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
  componentDidMount () {
    this.props.getHomeConfig()
  }

  render () {
    const {configList} = this.props
    console.log('render() ', configList)
    return (
      <div>asdfasd</div>
    )
  }
}

export default Home
