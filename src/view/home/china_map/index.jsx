import React, { Component } from 'react'
import {Row, Col} from 'antd'
import Wrapper from '../wrapper'
import Map from './map'
import Alert from './alert'

class ChinaMap extends Component {
  render () {
    const height = 600
    return (
      <Wrapper
        height={height}
        title='报警分布图'
        showExpend
      >
        <Row>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 24}}
            lg={{span: 16}}
            ref={col => { this.col = col }}
          >
            <Map height={height} />
          </Col>
          <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 24}}
            lg={{span: 8}}
          >
            <Alert />
          </Col>
        </Row>
      </Wrapper>
    )
  }
}

export default ChinaMap
