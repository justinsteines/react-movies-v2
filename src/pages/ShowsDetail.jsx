import { useParams } from 'react-router-dom'

function ShowsDetail() {
  const params = useParams()

  return (
    <>
      <h1>Shows Detail Page</h1>
      <p>Id: {params.id}</p>
    </>
  )
}

export default ShowsDetail
