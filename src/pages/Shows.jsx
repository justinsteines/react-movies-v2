import { useInfiniteQuery } from '@tanstack/react-query'

import {
  queryClient,
  showsTrendingQuery,
  showsAiringTodayQuery,
  showsAiringWeekQuery,
  showsPopularQuery,
  showsTopRatedQuery,
} from '../utils/http'
import Carousel from '../components/Carousel'

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

  const carousels = [
    {
      title: 'Trending Shows',
      items: trending,
    },
    {
      title: 'Shows Airing Today',
      items: airingToday,
    },
    {
      title: 'Shows Airing In The Next Week',
      items: airingWeek,
    },
    {
      title: 'Popular Shows',
      items: popular,
    },
    {
      title: 'Top Rated Shows',
      items: topRated,
    },
  ]

  return (
    <>
      {carousels.map((carousel) => (
        <Carousel
          key={carousel.title}
          title={carousel.title}
          items={carousel.items.map((show) => ({
            id: show.id,
            link: `/shows/${show.id}`,
            title: show.name,
            posterPath: show.poster_path,
            rating: show.vote_average,
          }))}
        />
      ))}
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
