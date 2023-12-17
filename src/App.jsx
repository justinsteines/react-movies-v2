import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ErrorPage from './pages/Error'
import HomePage, { loader as homeLoader } from './pages/Home'
import MainLayout from './layouts/Main'
import MoviesDetailPage, {
  loader as moviesDetailLoader,
} from './pages/MoviesDetail'
import MoviesPage, { loader as moviesLoader } from './pages/Movies'
import ShowsDetailPage, {
  loader as showsDetailLoader,
} from './pages/ShowsDetail'
import ShowsPage, { loader as showsLoader } from './pages/Shows'
import { queryClient } from './utils/http'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: 'movies',
        element: <MoviesPage />,
        loader: moviesLoader,
      },
      {
        path: 'movies/:id',
        element: <MoviesDetailPage />,
        loader: moviesDetailLoader,
      },
      {
        path: 'shows',
        element: <ShowsPage />,
        loader: showsLoader,
      },
      {
        path: 'shows/:id',
        element: <ShowsDetailPage />,
        loader: showsDetailLoader,
      },
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-right"
        position="bottom"
      />
    </QueryClientProvider>
  )
}

export default App
