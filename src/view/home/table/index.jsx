import React, {Component} from 'react'
import Wrapper from '../wrapper'
import {Table as AntTable} from 'antd'

class Table extends Component {
  render () {
    const height = 405
    const width = '100%'
    const innerStyle = {width, height: height - 50}
    const bottomStyle = {float: 'right', lineHeight: '20px', padding: '10'}
    const columns = [
      {title: '报警时间', dataIndex: 'time', key: 'time', render: value => value},
      {title: '设备名称', dataIndex: 'device', key: 'device', render: value => value},
      {title: '设备类型', dataIndex: 'type', key: 'type', render: value => value},
      {title: '故障等级', dataIndex: 'level', key: 'level', render: value => `等级${value}`},
      {
        title: '操作',
        key: 'op',
        render: (_, obj) => {
          return (<span style={{color: '#009EFB'}} onClick={() => { console.log(obj) }}>查看</span>)
        }
      },
    ]
    const data = [
      {
        'id': 'asdfasd1',
        'time': '2016/11/06 12:22:43',
        'device': '带式输送机',
        'type': '泵站油压警报',
        'level': 1
      },
      {
        'id': 'asdfasd2',
        'time': '2016/11/06 12:22:43',
        'device': '带式输送机',
        'type': '泵站油压警报',
        'level': 1
      },
      {
        'id': 'asdfasd3',
        'time': '2016/11/06 12:22:43',
        'device': '带式输送机',
        'type': '泵站油压警报',
        'level': 1
      },
      {
        'id': 'asdfasd4',
        'time': '2016/11/06 12:22:43',
        'device': '带式输送机',
        'type': '泵站油压警报',
        'level': 1
      },
      {
        'id': 'asdfasd5',
        'time': '2016/11/06 12:22:43',
        'device': '带式输送机',
        'type': '泵站油压警报',
        'level': 1
      }
    ]
    return (
      <Wrapper
        width={width}
        height={height}
        title='维护保养'
      >
        <div style={innerStyle}>
          <AntTable
            columns={columns}
            dataSource={data}
            pagination={false}
          />
          <div style={bottomStyle}>总计报警数21 <span style={{color: '#009EFB'}}>查看全部</span></div>
        </div>
      </Wrapper>
    )
  }
}

export default Table
