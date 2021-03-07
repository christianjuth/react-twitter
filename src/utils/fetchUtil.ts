import * as React from 'react'

export declare namespace FetchUtil {
  export type Status = 'idle' | 'pending' | 'error' | 'success'
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
    ...restConfig,
    ...args,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...args.headers
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
  const [data, setData] = React.useState<T | null>(null)

  React.useEffect(() => {
    if (status !== 'idle' || config?.enabled === false) {
      return
    }

    setStatus('pending')

    fetchUtil<T>(url, config)
    .then(res => {
      setData(res)
      setStatus('success')
    })
  }, [config])

  return [data, status] as const
}