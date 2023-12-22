import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'

function MainLayout() {
  const mainContentRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    mainContentRef.current.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <div className="grid grid-rows-[1fr_auto] h-screen-safe 2xl:container lg:grid-cols-[auto_1fr] lg:grid-rows-1 2xl:mx-auto">
        <main ref={mainContentRef} className="overflow-auto">
          <Outlet />
        </main>
        <MainNavigation />
      </div>
    </>
  )
}

export default MainLayout
