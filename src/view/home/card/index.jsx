import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Row, Col, Icon } from 'antd'
import cn from 'classnames'
import SortableListItem from './sortable_list_item'
import {changeUiCardOrder} from '../../../action/home'
import {isNull} from '../../../util'
import {
  ICON_CLASS_MAP,
  ICON_WRAPPER_CLASS_MAP,
} from './common'
import './index.scss'

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    changeUiCardOrder: bindActionCreators(changeUiCardOrder, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      draggingIndex: null,
      items: this.props.config,
    }
  }
  componentWillReceiveProps (nextProps) {
    const {config: items = []} = nextProps
    this.setState({items})
  }
  render () {
    const {data = {}} = this.props
    const {
      items = [],
      draggingIndex,
    } = this.state
    console.log('render() ', {data, items})
    const sortableItems = items.map((type, idx) => {
      const cardData = data[type] || {}
      const {name = '', num = 0} = cardData
      const middleClass = `middle-card item`
      const iconWrapperClass = cn('card', ICON_WRAPPER_CLASS_MAP[type])
      const iconClass = ICON_CLASS_MAP[type]
      return (
        <Col
          xs={24}
          sm={24}
          md={8}
          key={idx}
          className={middleClass}
          data-type={type}
        >
          <SortableListItem
            key={idx}
            sortId={idx}
            draggingIndex={draggingIndex}
            items={items}
            updateState={this.updateConfig}
            outline='list'
            childProps={{style: {height: '100px'}}}
          >
            <div className={iconWrapperClass}>
              <Icon type={iconClass} />
              <p>{name}</p>
              <p><span>{num}</span></p>
            </div>
          </SortableListItem>
        </Col>
      )
    })
    return <Row>{sortableItems}</Row>
  }

  updateConfig = config => {
    const {draggingIndex} = config
    const newState = {...this.state, ...config}
    this.setState(newState, () => {
      if (isNull(draggingIndex)) {
        // Stop drag and release mouse
        this.props.handleSave()
      } else {
        this.props.handleMove('card', this.state.items)
      }
    })
  }
}

export default Card
