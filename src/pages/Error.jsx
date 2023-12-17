import { useRouteError } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'

function ErrorPage() {
  const error = useRouteError()

  let message = 'Something went wrong!'

  if (error.status === 404) {
    message = 'Page not found!'
  }
  return (
    <>
      <MainNavigation />
      <main>
        <h1>{error.status}</h1>
        <p>{message}</p>
      </main>
    </>
  )
}

export default ErrorPage
