import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Row, Col} from 'antd'
import './index.scss'
// import PropTypes from 'prop-types'

class ChinaMap extends Component {
  constructor (props) {
    super(props)
    this.resizeTimeout = null
  }

  componentDidMount () {
    this.handleResize()
  }

  shouldComponentUpdate () {
    return false
  }

  componentWillUnmount () {
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
          <div ref={placeholder => { this.placeholder = placeholder }} style={style} />
        </Col>
      </Row>
    )
  }

  setupMap = () => {
    // 初始化百度地图
    const {BMap} = window
    const placeholder = ReactDOM.findDOMNode(this.placeholder)
    const map = new BMap.Map(placeholder)
    this.map = map
    // 操作地图
    this.moveToCenter()
    this.addController()
    // this.addLabel()
    this.addMarker()
  }

  moveToCenter = () => {
    // const {Point} = window.BMap
    // center
    this.map.centerAndZoom('兰州', 4)
    // enable scroll
    this.map.enableScrollWheelZoom(true)
  }

  addController = () => {
    const {
      BMAP_ANCHOR_TOP_LEFT,
      BMAP_ANCHOR_TOP_RIGHT,
      NavigationControl,
      ScaleControl,
    } = window.BMap
    this.map.addControl(new ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}))
    this.map.addControl(new NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT}))
  }

  addLabel = () => {
    // const {
    //   BMap,
    // } = window
    // const {
    //   Point,
    //   Size,
    //   Label,
    // } = BMap
    // const point = new Point(116.417, 39.909)
    // // 设置偏移
    // const option = {
    //   position: point,
    //   offset: new Size(-23, -33)
    // }
    // const label = new Label('<div class="clarify-marker">999+</div>', option)
    // // 添加样式
    // label.setStyle({
    //   'border-radius': '5px',
    //   'background': '#f00',
    // })
    // // 设置鼠标提示信息
    // label.setTitle('北京地区共1223台设备')
    // // 添加点击事件
    // label.addEventListener('click', this.handleLabelClick)
    // // 添加到容器用于后期后期管理
    // this.labelList.push(label)
    // this.map.addOverlay(label)
  }

  addMarker = () => {
    const {BMap} = window
    const {Point, Marker, Size} = BMap
    const point = new Point(116.417, 39.909)
    // 设置偏移
    const option = {
      offset: new Size(-23, -33)
    }
    const marker = new Marker(point, {option})
    marker.addEventListener('click', this.handleMarkerClick)
    this.map.addOverlay(marker)
  }

  clearMarker = () => {
    // 清除标记
    if (this.map) {
      this.map.clearOverlays()
    }
  }

  handleMarkerClick = event => {
    console.log('marker click event ', event)
    // 获取当前坐标
    // 获取等级10内的坐标
    // 跳转到缩放等级10
    // 清除所有坐标
    // 渲染等级10的坐标
  }

  handleResize = () => {
    window.clearTimeout(this.resizeTimeout)
    this.resizeTimeout = window.setTimeout(() => {
      const col = ReactDOM.findDOMNode(this.col)
      const {clientWidth: colWidth} = col
      this.colWidth = colWidth
      this.placeholder.style.width = colWidth + 'px'
      // 清除标记
      this.clearMarker()
      this.setupMap()
    }, 300)
  }
}

export default ChinaMap
