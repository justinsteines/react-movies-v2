import { useInfiniteQuery } from '@tanstack/react-query'

import {
  queryClient,
  moviesTrendingQuery,
  showsTrendingQuery,
} from '../utils/http'
import Carousel from '../components/Carousel'
import Hero from '../components/Hero'

function HomePage() {
  const { data: resMovies } = useInfiniteQuery(moviesTrendingQuery())
  const { data: resShows } = useInfiniteQuery(showsTrendingQuery())

  const movies = resMovies.pages.flatMap((p) => p.results)
  const shows = resShows.pages.flatMap((p) => p.results)

  const featureIndex = Math.floor(Math.random() * 10)

  let feature

  if (Math.floor(Math.random() * 2) === 0) {
    const movie = movies[featureIndex]
    feature = {
      link: `/movies/${movie.id}`,
      title: movie.title,
      overview: movie.overview,
      rating: movie.vote_average,
      backdropPath: movie.backdrop_path,
    }
  } else {
    const show = shows[featureIndex]
    feature = {
      link: `/shows/${show.id}`,
      title: show.name,
      overview: show.overview,
      rating: show.vote_average,
      backdropPath: show.backdrop_path,
    }
  }

  return (
    <>
      <Hero
        link={feature.link}
        title={feature.title}
        overview={feature.overview}
        rating={feature.rating}
        backdropPath={feature.backdropPath}
      />
      <Carousel
        title="Trending Movies"
        items={movies.map((movie) => ({
          id: movie.id,
          link: `/movies/${movie.id}`,
          title: movie.title,
          posterPath: movie.poster_path,
          rating: movie.vote_average,
        }))}
      />
      <Carousel
        title="Trending Shows"
        items={shows.map((show) => ({
          id: show.id,
          link: `/shows/${show.id}`,
          title: show.name,
          posterPath: show.poster_path,
          rating: show.vote_average,
        }))}
      />
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
