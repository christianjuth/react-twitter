import * as React from 'react'
import { useFetch, fetchUtil } from './fetchUtil'
import { urls } from './urls'

export declare namespace API {
  export type Tweet = {
    createdAt: string
    username: string
    id: string
    likes: number
    message: string
    pinned: false
    replies: number
    updatedAt: string
  }
}

function useTweets() {
  return useFetch<API.Tweet[]>(urls.api('/tweets'), { swr: true })
}

function useTweet(id: string) {
  return useFetch<API.Tweet[]>(urls.api(`/tweets/${id}`), { enabled: Boolean(id), swr: true })
}

function useProfile(handle?: string | null) {
  return useFetch<API.Tweet[]>(urls.api(`/profile/${handle}`), { enabled: Boolean(handle), swr: true })
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

function login({
  username,
  password
}: {
  username?: string
  password?: string
}) {
  return fetchUtil<any>(urls.api('/login'), {
    method: 'POST',
    body: {
      username,
      password
    }
  })
}

async function logout() {
  await fetchUtil<any>(urls.api('/logout'), {
    method: 'POST'
  })
  window.location.reload()
}

function useIsLoggedIn() {
  const [loggedIn, setLoggedIn] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    async function auth() {
      try {
        await login({})
        setLoggedIn(true)
      } catch(e) {
        console.log(e)
        setLoggedIn(false)
      }
    }
    auth()
  }, [])

  return loggedIn
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
  likeTweet,
  login,
  logout,
  useIsLoggedIn
}