import PDFViewer from './components/PDFViewer'
import Sidebar from './components/Sidebar'
import styles from './index.module.scss'

import demo from './demo5.pdf'
import FuncBar from './components/FuncBar'
const Home = (): JSX.Element => {
  return (
    <div className="h-full w-full flex gap-4">
      <div className="h-full w-[64px]">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col gap-2 py-2">
        <div>
          <FuncBar />
        </div>
        <div>
          <PDFViewer file={demo} />
        </div>
      </div>
    </div>
  )
}
export default Home
