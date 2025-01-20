import { Routes, Route, BrowserRouter } from 'react-router-dom'
import DefaultLayout from '@renderer/layouts/default'
import Home from '@renderer/pages/Home'

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
