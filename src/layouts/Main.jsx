import { Outlet } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'

function MainLayout() {
  return (
    <div className="grid grid-rows-[1fr_auto] h-screen-safe 2xl:container lg:grid-cols-[auto_1fr] lg:grid-rows-1 2xl:mx-auto">
      <main className="overflow-auto">
        <Outlet />
      </main>
      <MainNavigation />
    </div>
  )
}

export default MainLayout
