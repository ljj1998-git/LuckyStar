import PDFViewer from './components/PDFViewer'
import Sidebar from './components/Sidebar'
import styles from './index.module.scss'

import demo from './demo5.pdf'
const Home = (): JSX.Element => {
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-[64px]">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div>1</div>
        <div>
          <PDFViewer file={demo} />
        </div>
      </div>
    </div>
  )
}
export default Home
