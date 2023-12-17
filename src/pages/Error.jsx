import { useRouteError } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'

function ErrorPage() {
  const error = useRouteError()

  return (
    <>
      <MainNavigation />
      <main>
        <h1>{error?.status || 500}</h1>
        <p>{error.data?.message || 'An error has occurred!'}</p>
      </main>
    </>
  )
}

export default ErrorPage
