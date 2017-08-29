import React, {Component} from 'react'
import { Table, Icon } from 'antd'

class Alarm extends Component {
  render () {
    const columns = [{
      title: '设备编号',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '上次维保日期',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '设备维保周期',
      dataIndex: 'cycle',
      key: 'cycle',
    }, {
      title: '',
      dataIndex: 'more',
      key: 'more',
      render: (text, record) => (
        <span>
          <a href='#'>查看</a>
        </span>
      )

    }]

    const data = [{
      key: '1',
      number: 'KNO-0002',
      name: '带式输送机',
      time: '2016年8月22日',
      cycle: '3周',
      more: ''
    }, {
      key: '2',
      number: 'KNO-0002',
      name: '带式输送机',
      time: '2016年8月22日',
      cycle: '3周',
      more: ''
    }, {
      key: '3',
      number: 'KNO-0002',
      name: '带式输送机',
      time: '2016年8月22日',
      cycle: '3周',
      more: ''
    }, {
      key: '4',
      number: 'KNO-0002',
      name: '带式输送机',
      time: '2016年8月22日',
      cycle: '3周',
      more: ''
    }
    ]
    return (
      <div className='frame-box repair'>
        <div className='small-title'>
          维保提示
          <Icon type='arrows-alt' style={{float: 'right'}} />
        </div>
        <Table columns={columns} dataSource={data} pagination={false} className='home-table' />
        <div className='more'>共88条信息，<a>查看更多<Icon type='double-right' /></a></div>
      </div>
    )
  }
}

export default Alarm
