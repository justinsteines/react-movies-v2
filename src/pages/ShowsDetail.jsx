import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { queryClient, showsDetailQuery } from '../utils/http'
import Hero from '../components/Hero'

function ShowsDetail() {
  const params = useParams()

  const { data: show } = useQuery(showsDetailQuery(params.id))

  return (
    <Hero
      title={show.name}
      overview={show.overview}
      rating={show.vote_average}
      backdropPath={show.backdrop_path}
    />
  )
}

export default ShowsDetail

export async function loader({ params }) {
  const query = showsDetailQuery(params.id)
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
