import { useInfiniteQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import {
  queryClient,
  moviesTrendingQuery,
  showsTrendingQuery,
} from '../utils/http'

function HomePage() {
  const { data: resMovies } = useInfiniteQuery(moviesTrendingQuery())
  const { data: resShows } = useInfiniteQuery(showsTrendingQuery())

  const movies = resMovies.pages.flatMap((p) => p.results)
  const shows = resShows.pages.flatMap((p) => p.results)

  return (
    <>
      <h2>Trending Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <br />
      <h2>Trending Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            <Link to={`/shows/${show.id}`}>{show.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default HomePage

export function loader() {
  const moviesQuery = moviesTrendingQuery()
  const showsQuery = showsTrendingQuery()

  return Promise.allSettled([
    queryClient.getQueryData(moviesQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(moviesQuery),
    queryClient.getQueryData(showsQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(showsQuery),
  ])
}
