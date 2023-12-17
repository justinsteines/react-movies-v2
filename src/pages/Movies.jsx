import { useInfiniteQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import {
  queryClient,
  moviesTrendingQuery,
  moviesNowPlayingQuery,
  moviesUpcomingQuery,
  moviesPopularQuery,
  moviesTopRatedQuery,
} from '../utils/http'

function MoviesPage() {
  const { data: resTrending } = useInfiniteQuery(moviesTrendingQuery())
  const { data: resNowPlaying } = useInfiniteQuery(moviesNowPlayingQuery())
  const { data: resPopular } = useInfiniteQuery(moviesPopularQuery())
  const { data: resUpcoming } = useInfiniteQuery(moviesUpcomingQuery())
  const { data: resTopRated } = useInfiniteQuery(moviesTopRatedQuery())

  const trending = resTrending.pages.flatMap((p) => p.results)
  const nowPlaying = resNowPlaying.pages.flatMap((p) => p.results)
  const upcoming = resUpcoming.pages.flatMap((p) => p.results)
  const popular = resPopular.pages.flatMap((p) => p.results)
  const topRated = resTopRated.pages.flatMap((p) => p.results)

  return (
    <>
      <h2>Trending Movies</h2>
      <ul>
        {trending.map((movie) => (
          <li key={movie.id}>
            <Link to={`${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <br />
      <h2>Movies Now Playing</h2>
      <ul>
        {nowPlaying.map((movie) => (
          <li key={movie.id}>
            <Link to={`${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <br />
      <h2>Upcoming Movies</h2>
      <ul>
        {upcoming.map((movie) => (
          <li key={movie.id}>
            <Link to={`${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <br />
      <h2>Popular Movies</h2>
      <ul>
        {popular.map((movie) => (
          <li key={movie.id}>
            <Link to={`${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <br />
      <h2>Top Rated Movies</h2>
      <ul>
        {topRated.map((movie) => (
          <li key={movie.id}>
            <Link to={`${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default MoviesPage

export function loader() {
  const trendingQuery = moviesTrendingQuery()
  const nowPlayingQuery = moviesNowPlayingQuery()
  const upcomingQuery = moviesUpcomingQuery()
  const popularQuery = moviesPopularQuery()
  const topRatedQuery = moviesTopRatedQuery()

  return Promise.allSettled([
    queryClient.getQueryData(trendingQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(trendingQuery),
    queryClient.getQueryData(nowPlayingQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(nowPlayingQuery),
    queryClient.getQueryData(upcomingQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(upcomingQuery),
    queryClient.getQueryData(popularQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(popularQuery),
    queryClient.getQueryData(topRatedQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(topRatedQuery),
  ])
}
