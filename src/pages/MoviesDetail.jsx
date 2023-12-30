import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'

import {
  queryClient,
  moviesDetailQuery,
  moviesRecommendationsQuery,
} from '../utils/http'
import Carousel from '../components/Carousel'
import Container from '../components/Container'
import Hero from '../components/Hero'
import StarRating from '../components/StarRating'
import Tabs from '../components/Tabs'

const TABS = ['overview', 'videos', 'photos']

function MoviesDetail() {
  const params = useParams()
  let [searchParams, setSearchParams] = useSearchParams()

  const { data: movie } = useQuery(moviesDetailQuery(params.id))
  const { data: resRecommendations } = useInfiniteQuery(
    moviesRecommendationsQuery(params.id)
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
        key={movie.id}
        title={movie.title}
        overview={movie.overview}
        rating={movie.vote_average}
        backdropPath={movie.backdrop_path}
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
          {movie.credits.cast.length > 0 && (
            <Carousel
              key={`cast-${movie.id}`}
              title="Cast"
              items={movie.credits.cast.map((person) => ({
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
              key={`recommendations-${movie.id}`}
              title="More Like This"
              items={recommendations.map((movie) => ({
                id: movie.id,
                link: `/movies/${movie.id}`,
                imagePath: movie.poster_path,
                title: movie.title,
                subtitle: <StarRating rating={movie.vote_average} />,
              }))}
              itemsPerPage={{ mobile: 3, sm: 4, md: 4, lg: 5, xl: 6, '2xl': 7 }}
            />
          )}
        </Tabs.Content>
        <Tabs.Content value={TABS[1]}>
          <Container>Videos Content</Container>
        </Tabs.Content>
        <Tabs.Content value={TABS[2]}>
          <Container>Photos Content</Container>
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}

export default MoviesDetail

export async function loader({ params }) {
  const detailsQuery = moviesDetailQuery(params.id)
  const recommendationsQuery = moviesRecommendationsQuery(params.id)

  return Promise.allSettled([
    queryClient.getQueryData(detailsQuery.queryKey) ??
      (await queryClient.fetchQuery(detailsQuery)),
    queryClient.getQueryData(recommendationsQuery.queryKey) ??
      (await queryClient.fetchInfiniteQuery(recommendationsQuery)),
  ])
}
