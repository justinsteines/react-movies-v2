import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { queryClient, moviesDetailQuery } from '../utils/http'

function MoviesDetail() {
  const params = useParams()

  const { data: movie } = useQuery(moviesDetailQuery(params.id))

  return <h1>{movie.title}</h1>
}

export default MoviesDetail

export async function loader({ params }) {
  const query = moviesDetailQuery(params.id)
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
