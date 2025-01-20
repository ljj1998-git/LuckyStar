import { Outlet } from 'react-router-dom'

const DefaultLayout = (): JSX.Element => {
  return (
    <div className="bg-[#e9ebf0] w-full h-full">
      <Outlet />
    </div>
  )
}

export default DefaultLayout
