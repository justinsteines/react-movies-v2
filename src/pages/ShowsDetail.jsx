import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'

import { queryClient, showsDetailQuery } from '../utils/http'
import Container from '../components/Container'
import Hero from '../components/Hero'
import Tabs from '../components/Tabs'

const TABS = ['overview', 'episodes', 'videos', 'photos']

function ShowsDetail() {
  const params = useParams()
  let [searchParams, setSearchParams] = useSearchParams()

  const { data: show } = useQuery(showsDetailQuery(params.id))

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
        title={show.name}
        overview={show.overview}
        rating={show.vote_average}
        backdropPath={show.backdrop_path}
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
            <Container>Episodes Content</Container>
          </Tabs.Content>
          <Tabs.Content value={TABS[2]}>
            <Container>Videos Content</Container>
          </Tabs.Content>
          <Tabs.Content value={TABS[3]}>
            <Container>Photos Content</Container>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
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
