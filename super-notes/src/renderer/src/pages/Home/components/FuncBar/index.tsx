import { AppstoreOutlined, BarsOutlined, EditOutlined } from '@ant-design/icons'
import { Segmented } from 'antd'
import React from 'react'

const FuncBar: React.FC = () => {
  return (
    <div>
      <Segmented
        options={[
          { value: '1', icon: <EditOutlined /> },
          { value: '2', icon: <AppstoreOutlined /> }
        ]}
      />
    </div>
  )
}
export default FuncBar
