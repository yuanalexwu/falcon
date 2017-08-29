import React, {Component} from 'react'
import { Row, Col, Icon } from 'antd'

class Card extends Component {
  render () {
    return (
      <Row gutter={15}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className='card equipment'>
            <Icon type='fork' />
            <p>设备数量</p>
            <p><span>2345</span></p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className='card alarm'>
            <Icon type='exception' />
            <p>报警提醒数</p>
            <p><span>2345</span></p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className='card order'>
            <Icon type='bars' />
            <p>工单处理数量</p>
            <p><span>2345</span></p>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Card
