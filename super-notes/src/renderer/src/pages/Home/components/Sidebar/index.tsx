import {
  DatabaseOutlined,
  FolderOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SnippetsOutlined,
  UserOutlined
} from '@ant-design/icons'
import styles from './index.module.scss'
import { Avatar, Button, Divider } from 'antd'
import { createWorker } from 'tesseract.js'
import { useState } from 'react'

const handleClick = async () => {
  console.log(66)

  const worker = await createWorker('eng')
  const ret = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png')
  console.log(ret.data.text)
  await worker.terminate()
}

const Sidebar = (): JSX.Element => {
  const [show, setShow] = useState(false)

  return (
    <div className="bg-white rounded-r-md h-full flex flex-col items-center justify-between py-4">
      <div>
        <div className={styles.avatar}>
          <Avatar
            size={32}
            shape="square"
            style={{ backgroundColor: '#5c8aff', verticalAlign: 'middle' }}
            icon={<UserOutlined />}
          />
        </div>
        <Divider style={{ margin: '16px 0' }} />
        <div className="flex flex-col gap-2">
          <Button type="text" icon={<SearchOutlined />} />
          <Button type="text" icon={<DatabaseOutlined />} />
          <Button type="text" icon={<FolderOutlined />} />
        </div>
      </div>
      <div className="cursor-pointer">{show ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} </div>
    </div>
  )
}

export default Sidebar
