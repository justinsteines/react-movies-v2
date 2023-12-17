import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { queryClient, showsDetailQuery } from '../utils/http'

function ShowsDetail() {
  const params = useParams()

  const { data: show } = useQuery(showsDetailQuery(params.id))

  return <h1>{show.name}</h1>
}

export default ShowsDetail

export async function loader({ params }) {
  const query = showsDetailQuery(params.id)
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
