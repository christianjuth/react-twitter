import { useFetch, fetchUtil } from './fetchUtil'
import { urls } from './urls'

export declare namespace API {
  export type Tweet = {
    createdAt: string
    handle: string
    id: string
    likes: number
    message: string
    pinned: false
    replies: number
    updatedAt: string
  }
}

function useTweets() {
  return useFetch<API.Tweet[]>(urls.api('/tweets'))
}

function useTweet(id: string) {
  return useFetch<API.Tweet[]>(urls.api(`/tweets/${id}`))
}

function useProfile(handle?: string | null) {
  return useFetch<API.Tweet[]>(urls.api(`/profile/${handle}`), { enabled: Boolean(handle) })
}

function createTweet({
  message,
  handle,
  parentId
}: {
  message: string
  handle: string
  parentId?: string
}) {
  return fetchUtil<API.Tweet>(urls.api('/tweets'), {
    method: 'POST',
    body: {
      message,
      handle,
      parentId
    }
  })
}

function deleteTweet(id: string) {
  return fetchUtil(urls.api(`/tweets/${id}`), {
    method: 'DELETE',
  })
}

function likeTweet(id: string) {
  return fetchUtil(urls.api(`/tweets/${id}/like`), {
    method: 'POST',
  })
}

export const api = {
  useTweets,
  createTweet,
  useProfile,
  deleteTweet,
  useTweet,
  likeTweet
}