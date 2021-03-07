import { useFetch, urls, fetchUtil } from './utils'

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

function useProfile(handle?: string | null) {
  return useFetch<API.Tweet[]>(urls.api(`/profile/${handle}`), { enabled: Boolean(handle) })
}

function createTweet({
  message,
  handle
}: {
  message: string
  handle: string
}) {
  return fetchUtil<API.Tweet>(urls.api('/tweets'), {
    method: 'POST',
    body: {
      message,
      handle
    }
  })
}

function deleteTweet(id: string) {
  return fetchUtil(urls.api(`/tweets/${id}`), {
    method: 'DELETE',
  })
}

export const api = {
  useTweets,
  createTweet,
  useProfile,
  deleteTweet
}