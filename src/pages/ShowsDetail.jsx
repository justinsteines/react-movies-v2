import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'

import {
  queryClient,
  showsDetailQuery,
  showsRecommendationsQuery,
} from '../utils/http'
import Carousel from '../components/Carousel'
import ComingSoon from '../components/ComingSoon'
import Container from '../components/Container'
import Hero from '../components/Hero'
import StarRating from '../components/StarRating'
import Tabs from '../components/Tabs'

const TABS = ['overview', 'episodes', 'videos', 'photos']

function ShowsDetail() {
  const params = useParams()
  let [searchParams, setSearchParams] = useSearchParams()

  const { data: show } = useQuery(showsDetailQuery(params.id))
  const { data: resRecommendations } = useInfiniteQuery(
    showsRecommendationsQuery(params.id)
  )
  const recommendations = resRecommendations.pages.flatMap((p) => p.results)

  function handleTabChange(tab) {
    if (tab === TABS[0]) {
      setSearchParams((params) => ({ ...params }))
      return
    }
    setSearchParams((params) => ({ ...params, tab }))
  }

  return (
    <>
      <Hero
        key={show.id}
        title={show.name}
        overview={show.overview}
        rating={show.vote_average}
        ratingCount={show.vote_count}
        backdropPath={show.backdrop_path}
      />
      <Tabs.Root
        className="mt-14"
        value={searchParams.get('tab') || TABS[0]}
        onValueChange={handleTabChange}
      >
        <Tabs.List>
          {TABS.map((tab) => (
            <Tabs.Trigger
              key={tab}
              value={tab}
              isActive={
                searchParams.get('tab') === tab ||
                (!searchParams.get('tab') && tab === TABS[0])
              }
            >
              <span className="uppercase">{tab}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value={TABS[0]}>
          {show.credits.cast.length > 0 && (
            <Carousel
              key={`cast-${show.id}`}
              title="Cast"
              items={show.credits.cast.map((person) => ({
                id: person.id,
                link: `/people/${person.id}`,
                imagePath: person.profile_path,
                title: person.name,
                subtitle: person.character,
              }))}
              itemsPerPage={{ mobile: 3, sm: 4, md: 4, lg: 5, xl: 6, '2xl': 7 }}
            />
          )}
          {recommendations.length > 0 && (
            <Carousel
              key={`recommendations-${show.id}`}
              title="More Like This"
              items={recommendations.map((show) => ({
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
              itemsPerPage={{ mobile: 3, sm: 4, md: 4, lg: 5, xl: 6, '2xl': 7 }}
            />
          )}
        </Tabs.Content>
        <Tabs.Content value={TABS[1]}>
          <Container>
            <ComingSoon />
          </Container>
        </Tabs.Content>
        <Tabs.Content value={TABS[2]}>
          <Container>
            <ComingSoon />
          </Container>
        </Tabs.Content>
        <Tabs.Content value={TABS[3]}>
          <Container>
            <ComingSoon />
          </Container>
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}

export default ShowsDetail

export async function loader({ params }) {
  const detailsQuery = showsDetailQuery(params.id)
  const recommendationsQuery = showsRecommendationsQuery(params.id)

  return Promise.allSettled([
    queryClient.getQueryData(detailsQuery.queryKey) ??
      (await queryClient.fetchQuery(detailsQuery)),
    queryClient.getQueryData(recommendationsQuery.queryKey) ??
      (await queryClient.fetchInfiniteQuery(recommendationsQuery)),
  ])
}
