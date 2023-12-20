import { Outlet } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'

function MainLayout() {
  return (
    <div className="2xl:container 2xl:mx-auto">
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
