import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from './pages/Error'
import HomePage from './pages/Home'
import MainLayout from './layouts/Main'
import MoviesDetailPage from './pages/MoviesDetail'
import MoviesPage from './pages/Movies'
import ShowsDetailPage from './pages/ShowsDetail'
import ShowsPage from './pages/Shows'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'movies', element: <MoviesPage /> },
      { path: 'movies/:id', element: <MoviesDetailPage /> },
      { path: 'shows', element: <ShowsPage /> },
      { path: 'shows/:id', element: <ShowsDetailPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
