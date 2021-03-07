import * as React from 'react'

export declare namespace FetchUtil {
  export type Status = 'idle' | 'pending' | 'error' | 'success'

  export type Response<Data, Status> = [Data, Status]

  export namespace States {
    export type Idle = null
    export type Pending = null
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
}

export function useFetch<T>(url: string, config?: UseFetchConfig) {
  const [status, setStatus] = React.useState<FetchUtil.Status>('idle')
  const [data, setData] = React.useState<T | Error | FetchUtil.States.Error>()

  React.useEffect(() => {
    setStatus('idle')
    if (config?.enabled === false) {
      return
    }
    setStatus('pending')

    fetchUtil<T>(url, config)
    .then(res => {
      if (res !== null) {
        setData(res)
        setStatus('success')
      } else {
        setData({
          messgage: 'not found'
        })
        setStatus('error')  
      }
    })
    .catch(err => {
      setData(err)
      setStatus('error')
    })
  }, [url, config?.enabled])

  switch (status) {
    case 'idle':
      return [null, status] as FetchUtil.Response<FetchUtil.States.Idle, typeof status>
    case 'pending':
      return [null, status] as FetchUtil.Response<FetchUtil.States.Pending, typeof status>
    case 'success':
      return [data, status] as FetchUtil.Response<FetchUtil.States.Success<T>, typeof status>
    case 'error':
      return [data, status] as FetchUtil.Response<FetchUtil.States.Success<T>, typeof status>
  }
}