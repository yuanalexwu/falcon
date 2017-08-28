import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Row, Col} from 'antd'
import Wrapper from '../wrapper'
import {resizeEvent} from './common'

class Chart extends Component {
  constructor (props) {
    super(props)
    this.chart = null
    this.resizeTimeout = null
  }

  componentDidMount () {
    this.chart = window.echarts.init(this.placeholder)
    this.bindEvent()
  }

  componentDidUpdate () {
    this.draw()
  }

  componentWillUnmount () {
    this.removeEvent()
  }

  render () {
    const height = 400
    const innerStyle = {
      width: '100%',
      height: height - 50,
      display: 'inline-block'
    }
    return (
      <Row>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          ref={col => { this.col = col }}
        >
          <Wrapper
            height={height}
            title='设备状态'
            showExpend
          >
            <div
              ref={placeholder => { this.placeholder = placeholder }}
              style={innerStyle}
            />
          </Wrapper>
        </Col>
      </Row>
    )
  }

  bindEvent = () => {
    window.addEventListener('resize', this.handleResize, false)
    resizeEvent.add(this.handleResize)
  }

  handleResize = () => {
    window.clearTimeout(this.resizeTimeout)
    this.resizeTimeout = window.setTimeout(() => {
      const col = ReactDOM.findDOMNode(this.col)
      const {clientWidth: width = 0} = col
      this.placeholder.style.width = width
      this.chart.resize()
    }, 300)
  }

  removeEvent = () => {
    window.removeEventListener('resize', this.handleResize, false)
    resizeEvent.remove(this.handleResize)
  }

  draw () {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        top: 10,
        orient: 'horizontal',
        data: ['正常停机', '故障停机', '正常运行']
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            {value: 234, name: '正常停机'},
            {value: 135, name: '故障停机'},
            {value: 1548, name: '正常运行'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          animationDuration: 50,
        }
      ]
    }
    this.chart.setOption(option, {notMerge: true})
    this.chart.resize()
  }
}

export default Chart
