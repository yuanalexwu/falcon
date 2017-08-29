import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Row, Col } from 'antd'

import {getHomeConfig} from '../../action/home'

import Repair from './repair'
import Pie from './pie'
import Map from './map'
import Card from './card'

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
      <div className='dhms-overview'>
        <div className='title'>总览</div>
        <Card />
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Map />
          </Col>
        </Row>
        <Row gutter={15}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Pie />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Repair />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home
