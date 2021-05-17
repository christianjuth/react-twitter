import * as React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import hash from 'imurmurhash'

const DEFALT_SWR_REVALIDATE_SECONDS = 60 * 60 * 24 * 7 // one week
const SWR_CACHE_KEY = 'SWR'

export declare namespace FetchUtil {
  export type Status = 'idle' | 'pending' | 'error' | 'success'

  export type Response<Status, Data, Error = never> = {
    status: Status
    data: Data
    error: Error
    refresh: () => {}
  }

  export namespace States {
    export type Idle<T> = null | T
    export type Pending<T> = null | T
    export type Error = { messgage: string }
    export type Success<T> = T
  }
}

interface Config extends Omit<RequestInit, 'body'> {
  body?: Record<string, any>
}

export async function fetchUtil<T> (url: string, config?: Config): Promise<T | null> {
  let args: RequestInit = {}

  const { body, ...restConfig } = config ?? {}
  
  if (body) {
    args.body = JSON.stringify(body)
  }
  
  const response = await fetch(url, {
    credentials: "include",
    cache: 'no-cache',
    ...restConfig,
    ...args,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...restConfig.headers,
      ...args.headers,
    }
  })

  if (response.status >= 400) {
    const { error } = await response.json()
    throw new Error(error ?? 'failed to fetch')
  }

  return await response.json()
}

interface UseFetchConfig extends Config {
  enabled?: boolean
  clearDataOnRefresh?: boolean
  swr?: boolean
  swrRevalidateSeconds?: number
}

// These three functions are used for 
// stale while revalidating (swr) cachind
function keyGen(data: string) {
  return String(hash(data).result())
}
function saveData(keySeed: string, value: Record<string, any>) {
  if (typeof window !== 'undefined') {
    const hashedKey = keyGen(keySeed)

    // Get entire cache
    const swrCacheString = window.localStorage.getItem(SWR_CACHE_KEY)
    const swrCache = swrCacheString ? JSON.parse(swrCacheString) : {}
    // Add item to cache
    swrCache[hashedKey] = { value, updatedAt: Date.now() }
    // Update localStorage new cache
    window.localStorage.setItem(SWR_CACHE_KEY, JSON.stringify(swrCache))
  }
}
function getData(keySeed: string, ttlSeconds: number) {
  if (typeof window === 'undefined') {
    return null
  }
  try {
    // Get entire cache
    const swrCacheString = window.localStorage.getItem(SWR_CACHE_KEY)
    const swrCache = swrCacheString ? JSON.parse(swrCacheString) : {}

    // Look up item in cache
    const hashedKey = keyGen(keySeed)
    const item = swrCache[hashedKey]
  
    if (!item) {
      return null
    }
    const { value, updatedAt } = item
  
    // Check if value is still valid
    if (isNaN(updatedAt) || (Date.now() - updatedAt) > (ttlSeconds * 1000)) {
      return null
    }
  
    return value ?? null
  } catch(e) {
    return null
  }
}

export function useFetch<T>(url: string, config?: UseFetchConfig) {
  const [ status, setStatus ] = React.useState<FetchUtil.Status>('idle')

  const swrKey = JSON.stringify({ url, config })
  const initData = config?.swr ? getData(
    swrKey, 
    config.swrRevalidateSeconds ?? DEFALT_SWR_REVALIDATE_SECONDS
  ) : null

  const [ data, setData ] = React.useState<T | null>(initData ?? null)
  const [ error, setError ] = React.useState<FetchUtil.States.Error | null>(null)
  const [ refreshKey, setRefreshKey ] = React.useState(0)

  useDeepCompareEffect(() => {
    setStatus('idle')
    if (config?.enabled === false) {
      return
    }
    setStatus('pending')
    if (config?.clearDataOnRefresh) {
      setData(null)
    }

    fetchUtil<T>(url, config)
    .then(res => {
      if (res !== null) {
        setData(res)
        if (config?.swr) {
          saveData(swrKey, res) 
        }
        setStatus('success')
      } else {
        setError({
          messgage: 'not found'
        })
        setStatus('error')  
      }
    })
    .catch(err => {
      setError(err)
      setStatus('error')
    })
  }, [url, config ?? {}, refreshKey, swrKey])

  // included in all returns
  const generic = {
    refresh: () => setRefreshKey(k => k+1),
    status
  }

  switch (status) {
    case 'idle':
      return {
        ...generic,
        data, 
      } as FetchUtil.Response<'idle', FetchUtil.States.Idle<T>>
    case 'pending':
      return {
        ...generic,
        data, 
      } as FetchUtil.Response<'pending', FetchUtil.States.Pending<T>>
    case 'success':
      return {
        ...generic,
        data, 
      } as FetchUtil.Response<'success', FetchUtil.States.Success<T>>
    case 'error':
      return {
        ...generic,
        data: null,
        error,
      } as FetchUtil.Response<'error', null, FetchUtil.States.Error>
  }
}