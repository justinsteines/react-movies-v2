import { useRouteError } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'

function ErrorPage() {
  const error = useRouteError()

  return (
    <>
      <div className="grid grid-rows-[1fr_auto] h-screen-safe 2xl:container lg:grid-cols-[auto_1fr] lg:grid-rows-1 2xl:mx-auto">
        <main className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{error?.status || 500}</h1>
            <p className="mt-4 text-xl">
              {error.data?.message || 'An error has occurred!'}
            </p>
          </div>
        </main>
        <MainNavigation />
      </div>
    </>
  )
}

export default ErrorPage
