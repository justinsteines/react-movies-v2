import { json } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'

const HOURS_4 = 1000 * 60 * 60 * 4
const HOURS_24 = 1000 * 60 * 60 * 24

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: HOURS_4,
      gcTime: HOURS_4,
      retry: 0,
    },
  },
})

function tmdbUrl(path, params = {}) {
  const tmdbUrl = new URL(`3/${path}`, 'https://api.themoviedb.org/')

  // TODO: Proxy request to TMDB through custom backend to hide API key.
  tmdbUrl.searchParams.set('api_key', import.meta.env.VITE_TMDB_API_KEY)
  tmdbUrl.searchParams.set('language', 'en-US')
  tmdbUrl.searchParams.set('include_adult', 'false')

  for (const [key, value] of Object.entries(params)) {
    tmdbUrl.searchParams.set(key, value)
  }

  return tmdbUrl.href
}

export function moviesTrendingQuery() {
  return {
    queryKey: ['movies', 'trending'],
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(
        tmdbUrl('trending/movie/week', { page: pageParam }),
        { signal }
      )
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch trending movies.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function moviesPopularQuery() {
  return {
    queryKey: ['movies', 'popular'],
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(tmdbUrl('movie/popular', { page: pageParam }), {
        signal,
      })
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch popular movies.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function moviesTopRatedQuery() {
  return {
    queryKey: ['movies', 'topRated'],
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(tmdbUrl('movie/top_rated', { page: pageParam }), {
        signal,
      })
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch top rated movies.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function moviesUpcomingQuery() {
  return {
    queryKey: ['movies', 'upcoming'],
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(tmdbUrl('movie/upcoming', { page: pageParam }), {
        signal,
      })
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch upcoming movies.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function moviesNowPlayingQuery() {
  return {
    queryKey: ['movies', 'nowPlaying'],
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(
        tmdbUrl('movie/now_playing', { page: pageParam }),
        {
          signal,
        }
      )
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch movies playing now.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function moviesDetailQuery(id) {
  return {
    queryKey: ['movies', id],
    queryFn: async ({ queryKey, signal }) => {
      const res = await fetch(
        tmdbUrl(`movie/${queryKey[1]}`, { append_to_response: 'credits' }),
        { signal }
      )
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch movie details.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    staleTime: HOURS_24,
    gcTime: HOURS_24,
  }
}

export function moviesRecommendationsQuery(id) {
  return {
    queryKey: ['movies', id, 'recommendations'],
    queryFn: async ({ queryKey, signal }) => {
      const res = await fetch(tmdbUrl(`movie/${queryKey[1]}/recommendations`), {
        signal,
      })
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch movie recommendations.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function showsTrendingQuery() {
  return {
    queryKey: ['shows', 'trending'],
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(
        tmdbUrl('trending/tv/week', { page: pageParam }),
        { signal }
      )
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch trending shows.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function showsAiringTodayQuery() {
  return {
    queryKey: ['shows', 'airingToday'],
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(tmdbUrl('tv/airing_today', { page: pageParam }), {
        signal,
      })
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch shows airing today.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function showsAiringWeekQuery() {
  return {
    queryKey: ['shows', 'airingWeek'],
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(tmdbUrl('tv/on_the_air', { page: pageParam }), {
        signal,
      })
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch shows airing in the next week.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function showsPopularQuery() {
  return {
    queryKey: ['shows', 'popular'],
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(tmdbUrl('tv/popular', { page: pageParam }), {
        signal,
      })
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch popular shows.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function showsTopRatedQuery() {
  return {
    queryKey: ['shows', 'topRated'],
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(tmdbUrl('tv/top_rated', { page: pageParam }), {
        signal,
      })
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch top rated shows.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}

export function showsDetailQuery(id) {
  return {
    queryKey: ['shows', id],
    queryFn: async ({ queryKey, signal }) => {
      const res = await fetch(
        tmdbUrl(`tv/${queryKey[1]}`, { append_to_response: 'credits' }),
        { signal }
      )
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch show details.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    staleTime: HOURS_24,
    gcTime: HOURS_24,
  }
}

export function showsRecommendationsQuery(id) {
  return {
    queryKey: ['shows', id, 'recommendations'],
    queryFn: async ({ queryKey, signal }) => {
      const res = await fetch(tmdbUrl(`tv/${queryKey[1]}/recommendations`), {
        signal,
      })
      if (!res.ok) {
        throw json(
          { message: 'Could not fetch show recommendations.' },
          { status: res.status }
        )
      }
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  }
}
