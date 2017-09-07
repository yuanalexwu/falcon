import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Row, Col } from 'antd'
import {
  getHomeConfig,
  getHomeData,
} from '../../action/home'
import {
  getConfigFromListByType,
  changeSubElementUiOrder,
  changeElementUiOrder,
} from './common'
import Repair from './repair'
import Pie from './pie'
import Map from './map'
import Card from './card'

function mapStateToProps (state) {
  const {home = {}} = state
  const {configList = [], configData = {}} = home
  return {
    configList,
    configData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getHomeConfig: bindActionCreators(getHomeConfig, dispatch),
    getHomeData: bindActionCreators(getHomeData, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
  constructor (props) {
    super(props)
    /**
     * Store the total config data as soon as we fetch it from server.
     * We will change the rerange info by changing this backup config.
     * After change we will send this backup config data to server
     */
    this.backUpConfigList = []
  }
  componentWillReceiveProps (nextProps) {
    const {configList = []} = nextProps
    if (this.backUpConfigList.length === 0 && configList.length > 0) {
      this.backUpConfigList = configList
    }
  }
  componentDidMount () {
    this.props.getHomeConfig()
    this.props.getHomeData()
  }

  render () {
    const {
      configList,
      configData
    } = this.props
    const {device = {}, alarm = {}, issue = {}} = configData

    const cardConfig = getConfigFromListByType('card', configList)
    return (
      <div className='dhms-overview'>
        <div className='title'>总览</div>
        <Card
          data={{device, alarm, issue}}
          config={cardConfig}
          handleMove={this.handleMoveSubElement}
          handleSave={this.handleUpdateNewConfig}
        />
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

  handleMoveSubElement = (type, list) => {
    this.backUpConfigList = changeSubElementUiOrder(type, list, this.backUpConfigList)
  }

  handleMoveElement = (newIndex, oldIndex) => {
    this.backUpConfigList = changeElementUiOrder(newIndex, oldIndex)
  }

  handleUpdateNewConfig = () => {
    // TODO Update config save it to server
    console.log('handleUpdateNewConfig() ', this.backUpConfigList[0]['list'])
  }
}

export default Home
