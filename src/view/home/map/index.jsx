import React, {Component} from 'react'
import { Row, Col, Icon } from 'antd'

class Map extends Component {
  render () {
    return (
      <div className='frame-box alarm'>
        <div className='small-title'>
          设备及报警分布图
          <Icon type='arrows-alt' style={{float: 'right'}} />
        </div>
        <Row>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <div className='map-chart'>
              <span style={{}}>过户激光焊接</span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className='alarm-list'>
              <div>
                <ul>
                  <li>
                    <p className='l-title'> 苏州德姆期信息技术有限公司</p>
                    <p>设备名称：带式输送机</p>
                    <p>故障类型：带式输送机</p>
                    <p>故障时间：2016/11/06 12:22:43</p>
                    <p>故障等级：<i className='tag' style={{backgroundColor: '#F9243F'}}>严重</i></p>
                  </li>
                  <li>
                    <p className='l-title'> 苏州德姆期信息技术有限公司</p>
                    <p>设备名称：带式输送机</p>
                    <p>故障类型：带式输送机</p>
                    <p>故障时间：2016/11/06 12:22:43</p>
                    <p>故障等级：<i className='tag' style={{backgroundColor: '#FFB53E'}}>注意</i></p>
                  </li>
                  <li>
                    <p className='l-title'> 苏州德姆期信息技术有限公司</p>
                    <p>设备名称：带式输送机</p>
                    <p>故障类型：带式输送机</p>
                    <p>故障时间：2016/11/06 12:22:43</p>
                    <p>故障等级：<i className='tag' style={{backgroundColor: '#1EBFAE'}}>一般</i></p>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Map
