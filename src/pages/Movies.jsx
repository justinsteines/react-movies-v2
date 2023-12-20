import { useInfiniteQuery } from '@tanstack/react-query'

import {
  queryClient,
  moviesTrendingQuery,
  moviesNowPlayingQuery,
  moviesUpcomingQuery,
  moviesPopularQuery,
  moviesTopRatedQuery,
} from '../utils/http'
import Carousel from '../components/Carousel'

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

  const carousels = [
    {
      title: 'Trending Movies',
      items: trending,
    },
    {
      title: 'Now Playing Movies',
      items: nowPlaying,
    },
    {
      title: 'Upcoming Movies',
      items: upcoming,
    },
    {
      title: 'Popular Movies',
      items: popular,
    },
    {
      title: 'Top Rated Movies',
      items: topRated,
    },
  ]

  return (
    <>
      {carousels.map((carousel) => (
        <Carousel
          key={carousel.title}
          title={carousel.title}
          items={carousel.items.map((movie) => ({
            id: movie.id,
            link: `/movies/${movie.id}`,
            title: movie.title,
            posterPath: movie.poster_path,
            rating: movie.vote_average,
          }))}
        />
      ))}
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
