import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { queryClient, moviesDetailQuery } from '../utils/http'
import Hero from '../components/Hero'

function MoviesDetail() {
  const params = useParams()

  const { data: movie } = useQuery(moviesDetailQuery(params.id))

  return (
    <Hero
      title={movie.title}
      overview={movie.overview}
      rating={movie.vote_average}
      backdropPath={movie.backdrop_path}
    />
  )
}

export default MoviesDetail

export async function loader({ params }) {
  const query = moviesDetailQuery(params.id)
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
