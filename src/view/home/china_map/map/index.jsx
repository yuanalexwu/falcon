import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Row, Col} from 'antd'
import PropTypes from 'prop-types'
import {resizeEvent} from './common'

class Map extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
  }

  static defaultProps = {
    width: 0,
    height: 0,
    isExpend: false
  }

  constructor (props) {
    super(props)
    this.pointList = [
      {
        id: '1',
        customer: '苏州德姆斯',
        name: '带式输送机1',
        value: [121.15, 31.89, 0],
      },
      {
        id: '2',
        customer: '苏州德姆斯',
        name: '带式输送机2',
        value: [109.781327, 39.608266, 0],
      }
    ]
    this.alertPoint = {
      id: '2',
      type: '泵站油压警报',
      level: 3,
      time: '2016/11/06 12:22:43',
    }

    this.flashInterval = null
    this.isFlashStop = false
    this.isAlertSymbolEmphasis = false
    this.resetAfterMouseMoveTimeout = null
    this.stopAlertFlashTimeout = null
    this.isPointReseted = false
  }

  componentDidMount () {
    this.chart = window.echarts.init(this.placeholder)
    this.bindEvent()
    if (window.clearInterval(this.flashInterval)) {
      this.flashInterval = window.setInterval(this.handleAlertFlash, 1000)
    }
    this.draw()
    this.handleResize()
  }

  shouldComponentUpdate () {
    return false
  }

  componentWillUnmount () {
    this.removeEvent()
  }

  render () {
    const {height} = this.props
    const style = {
      width: this.colWidth || 0,
      height,
    }
    return (
      <Row>
        <Col
          xs={{span: 24}}
          sm={{span: 24}}
          ref={col => { this.col = col }}
        >
          <div
            ref={placeholder => { this.placeholder = placeholder }}
            style={style}
          />
        </Col>
      </Row>
    )
  }

  bindEvent = () => {
    window.addEventListener('resize', this.handleResize, false)
    resizeEvent.add(this.handleResize)
    this.chart.on('mouseover', this.handleChartMouseOver)
  }

  removeEvent = () => {
    window.removeEventListener('resize', this.handleResize, false)
    resizeEvent.removeEvent(this.handleResize)
    this.chart.off('mouseover', this.handleChartMouseOver)
  }

  handleResize = () => {
    window.clearTimeout(this.resizeTimeout)
    this.resizeTimeout = window.setTimeout(() => {
      const col = ReactDOM.findDOMNode(this.col)
      const {clientWidth: colWidth} = col
      this.colWidth = colWidth
      this.placeholder.style.width = colWidth + 'px'
      this.chart.resize()
    }, 300)
  }

  handleChartMouseOver = params => {
    if (!this.isFlashStop) {
      this.stopAlertFlash()
    }
    this.startAlertFlashLaterIfNoInteractive()
  }

  stopAlertFlash = () => {
    window.clearTimeout(this.stopAlertFlashTimeout)
    this.stopAlertFlashTimeout = setTimeout(() => {
      this.isFlashStop = true
      this.draw()
    }, 0)
  }

  startAlertFlashLaterIfNoInteractive = () => {
    window.clearTimeout(this.mouseMoveRestTimeout)
    this.mouseMoveRestTimeout = window.setTimeout(() => {
      // Rest state for the next user action
      this.isFlashStop = false
    }, 4000)
  }

  handleAlertFlash = () => {
    if (this.isFlashStop) {
      return
    }

    const {chart, points = [], alert} = this
    let dataIndex = points.findIndex((elem) => {
      return alert && alert.id === elem.id
    })
    if (dataIndex >= 0) {
      this.isAlertSymbolEmphasis = !this.isAlertSymbolEmphasis
      chart.dispatchAction({
        type: 'showTip',
        seriesIndex: '0',
        dataIndex
      })
    }
    this.draw()
  }

  draw () {
    let {chart, points = [], alert} = this
    // Set emphasis
    const data = points.map((elem) => {
      if (this.isFlashStop || !alert) {
        return elem
      }
      const {symbolSize, itemStyle, ...basicElem} = elem
      // Set size and color for alert symbol
      if (basicElem.id === alert.id) {
        basicElem.itemStyle = {
          normal: {color: '#ff0'}
        }
        if (this.isAlertSymbolEmphasis) {
          basicElem.symbolSize = 50
        }
      }
      return basicElem
    })

    const option = {
      tooltip: {
        trigger: 'item',
        alwaysShowContent: true,
        formatter: params => {
          const {dataIndex, data} = params
          const tooltip = this.parseTooltip(dataIndex, data)
          return tooltip
        }
      },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: false
          }
        },
      },
      series: [
        {
          name: 'pm2.5',
          type: 'scatter',
          coordinateSystem: 'geo',
          data,
          symbolSize: 20,
          symbol: 'pin',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        }
      ]
    }
    chart.setOption(option, {notMerge: true})
  }

  parseTooltip = (dataIndex, currentPoint) => {
    const res = []
    const {alert} = this.state
    res.push(`<div style="width: 100%;text-align: left;">使用单位: ${currentPoint.customer}</div>`)
    res.push(`<div style="width: 100%;text-align: left;">设备名称: ${currentPoint.name}</div>`)
    if (alert && alert.id === currentPoint.id) {
      res.push(`<div style="width: 100%;text-align: left;">故障类型: ${alert.type}</div>`)
      res.push(`<div style="width: 100%;text-align: left;">故障等级: ${alert.level}</div>`)
      res.push(`<div style="width: 100%;text-align: left;">${alert.time}</div>`)
    }
    return res.join('')
  }
}

export default Map
