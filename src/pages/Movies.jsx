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
import Hero from '../components/Hero'
import StarRating from '../components/StarRating'

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

  let feature = trending[Math.floor(Math.random() * 10)]

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
      <Hero
        link={`/movies/${feature.id}`}
        title={feature.title}
        overview={feature.overview}
        rating={feature.vote_average}
        backdropPath={feature.backdrop_path}
      />
      {carousels.map((carousel) => (
        <Carousel
          key={carousel.title}
          title={carousel.title}
          items={carousel.items.map((movie) => ({
            id: movie.id,
            link: `/movies/${movie.id}`,
            imagePath: movie.poster_path,
            title: movie.title,
            subtitle: <StarRating rating={movie.vote_average} />,
          }))}
          itemsPerPage={{ mobile: 2, sm: 3, md: 3, lg: 4, xl: 5, '2xl': 6 }}
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
