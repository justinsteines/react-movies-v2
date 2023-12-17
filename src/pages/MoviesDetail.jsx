import { useParams } from 'react-router-dom'

function MoviesDetail() {
  const params = useParams()

  return (
    <>
      <h1>Movies Detail Page</h1>
      <p>Id: {params.id}</p>
    </>
  )
}

export default MoviesDetail
