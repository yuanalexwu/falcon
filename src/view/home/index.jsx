import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getHomeConfig} from '../../action/home'
import {Row, Col} from 'antd'
import Chart from './chart'
import Table from './table'
import ChinaMap from './china_map'
import './index.css'

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
    const {configList} = this.props // eslint-disable-line

    return (
      <div>
        <Row>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 24}}
            lg={{span: 12}}
          >
            <Chart />
          </Col>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 24}}
            lg={{span: 12}}
          >
            <Table />
          </Col>
        </Row>
        <Row>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
          >
            <ChinaMap />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home
