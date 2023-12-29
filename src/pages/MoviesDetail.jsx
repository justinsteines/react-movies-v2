import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'

import { queryClient, moviesDetailQuery } from '../utils/http'
import Container from '../components/Container'
import Hero from '../components/Hero'
import Tabs from '../components/Tabs'

const TABS = ['overview', 'videos', 'photos']

function MoviesDetail() {
  const params = useParams()
  let [searchParams, setSearchParams] = useSearchParams()

  const { data: movie } = useQuery(moviesDetailQuery(params.id))

  function handleTabChange(tab) {
    if (tab === TABS[0]) {
      setSearchParams({ ...searchParams })
      return
    }
    setSearchParams({ ...searchParams, tab })
  }

  return (
    <>
      <Hero
        title={movie.title}
        overview={movie.overview}
        rating={movie.vote_average}
        backdropPath={movie.backdrop_path}
      />
      <div className="mt-8">
        <Tabs.Root defaultValue={searchParams.get('tab') || TABS[0]}>
          <Tabs.List>
            {TABS.map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                isActive={
                  searchParams.get('tab') === tab ||
                  (!searchParams.get('tab') && tab === TABS[0])
                }
                onClick={() => handleTabChange(tab)}
              >
                <span className="uppercase">{tab}</span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Tabs.Content value={TABS[0]}>
            <Container>Overview Content</Container>
          </Tabs.Content>
          <Tabs.Content value={TABS[1]}>
            <Container>Videos Content</Container>
          </Tabs.Content>
          <Tabs.Content value={TABS[2]}>
            <Container>Photos Content</Container>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
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
