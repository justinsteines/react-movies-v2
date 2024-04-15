import { useInfiniteQuery } from '@tanstack/react-query'

import {
  queryClient,
  moviesTrendingQuery,
  showsTrendingQuery,
} from '../utils/http'
import Carousel from '../components/Carousel'
import Hero from '../components/Hero'
import StarRating from '../components/StarRating'

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
      ratingCount: movie.vote_count,
      backdropPath: movie.backdrop_path,
    }
  } else {
    const show = shows[featureIndex]
    feature = {
      link: `/shows/${show.id}`,
      title: show.name,
      overview: show.overview,
      rating: show.vote_average,
      ratingCount: show.vote_count,
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
        ratingCount={feature.ratingCount}
        backdropPath={feature.backdropPath}
      />
      <Carousel
        title="Trending Movies"
        items={movies.map((movie) => ({
          id: movie.id,
          link: `/movies/${movie.id}`,
          imagePath: movie.poster_path,
          title: movie.title,
          subtitle: (
            <StarRating
              rating={movie.vote_average}
              ratingCount={movie.vote_count}
            />
          ),
        }))}
        itemsPerPage={{ mobile: 2, sm: 3, md: 3, lg: 4, xl: 5, '2xl': 6 }}
      />
      <Carousel
        title="Trending Shows"
        items={shows.map((show) => ({
          id: show.id,
          link: `/shows/${show.id}`,
          imagePath: show.poster_path,
          title: show.name,
          subtitle: (
            <StarRating
              rating={show.vote_average}
              ratingCount={show.vote_count}
            />
          ),
        }))}
        itemsPerPage={{ mobile: 2, sm: 3, md: 3, lg: 4, xl: 5, '2xl': 6 }}
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
