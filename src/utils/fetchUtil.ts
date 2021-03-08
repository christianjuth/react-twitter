import * as React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

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
}

export function useFetch<T>(url: string, config?: UseFetchConfig) {
  const [ status, setStatus ] = React.useState<FetchUtil.Status>('idle')
  const [ data, setData ] = React.useState<T | null>(null)
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
    console.log('fetching')

    fetchUtil<T>(url, config)
    .then(res => {
      if (res !== null) {
        setData(res)
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
  }, [url, config ?? {}, refreshKey])

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