import { useInfiniteQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import {
  queryClient,
  showsTrendingQuery,
  showsAiringTodayQuery,
  showsAiringWeekQuery,
  showsPopularQuery,
  showsTopRatedQuery,
} from '../utils/http'

function ShowsPage() {
  const { data: resTrending } = useInfiniteQuery(showsTrendingQuery())
  const { data: resAiringToday } = useInfiniteQuery(showsAiringTodayQuery())
  const { data: resAiringWeek } = useInfiniteQuery(showsAiringWeekQuery())
  const { data: resPopular } = useInfiniteQuery(showsPopularQuery())
  const { data: resTopRated } = useInfiniteQuery(showsTopRatedQuery())

  const trending = resTrending.pages.flatMap((p) => p.results)
  const airingToday = resAiringToday.pages.flatMap((p) => p.results)
  const airingWeek = resAiringWeek.pages.flatMap((p) => p.results)
  const popular = resPopular.pages.flatMap((p) => p.results)
  const topRated = resTopRated.pages.flatMap((p) => p.results)

  return (
    <>
      <h2>Trending Shows</h2>
      <ul>
        {trending.map((show) => (
          <li key={show.id}>
            <Link to={`${show.id}`}>{show.name}</Link>
          </li>
        ))}
      </ul>
      <br />
      <h2>Shows Airing Today</h2>
      <ul>
        {airingToday.map((show) => (
          <li key={show.id}>
            <Link to={`${show.id}`}>{show.name}</Link>
          </li>
        ))}
      </ul>
      <br />
      <h2>Shows Airing In The Next Week</h2>
      <ul>
        {airingWeek.map((show) => (
          <li key={show.id}>
            <Link to={`${show.id}`}>{show.name}</Link>
          </li>
        ))}
      </ul>
      <br />
      <h2>Popular Shows</h2>
      <ul>
        {popular.map((show) => (
          <li key={show.id}>
            <Link to={`${show.id}`}>{show.name}</Link>
          </li>
        ))}
      </ul>
      <br />
      <h2>Top Rated Shows</h2>
      <ul>
        {topRated.map((show) => (
          <li key={show.id}>
            <Link to={`${show.id}`}>{show.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ShowsPage

export function loader() {
  const trendingQuery = showsTrendingQuery()
  const airingTodayQuery = showsAiringTodayQuery()
  const airingWeekQuery = showsAiringWeekQuery()
  const popularQuery = showsPopularQuery()
  const topRatedQuery = showsTopRatedQuery()

  return Promise.allSettled([
    queryClient.getQueryData(trendingQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(trendingQuery),
    queryClient.getQueryData(airingTodayQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(airingTodayQuery),
    queryClient.getQueryData(airingWeekQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(airingWeekQuery),
    queryClient.getQueryData(popularQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(popularQuery),
    queryClient.getQueryData(topRatedQuery.queryKey) ??
      queryClient.fetchInfiniteQuery(topRatedQuery),
  ])
}
