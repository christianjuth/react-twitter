import * as React from 'react'
const LOCAL_STORAGE_KEY = 'twitter-userName'

function validHandle(handle: string) {
  return /^([a-z0-9]|-|_)+$/i.test(handle)
}

function useIsLoggedIn() {
  const [loggedIn, setLoggedIn] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    function updateLoginState() {
      const newState = isLoggedIn()

      if (newState !== loggedIn) {
        setLoggedIn(newState)
      }
    }

    updateLoginState()
    const id = setInterval(updateLoginState, 500)

    return () => {
      clearInterval(id)
    }
  }, [loggedIn])

  return loggedIn
}

function useHandle() {
  const loggedIn = useIsLoggedIn()
  return loggedIn !== undefined ? localStorage.getItem(LOCAL_STORAGE_KEY) : undefined
}

function isLoggedIn() {
  return Boolean(localStorage.getItem(LOCAL_STORAGE_KEY))
}

function login(handle: string) {
  handle = handle.toLowerCase()
  if (!validHandle(handle)) {
    throw new Error(`Error: invalid handle ${handle}. Please use numbers, letters, underscores, and spaces only.`)
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, handle)
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

function logout() {
  if (isLoggedIn()) {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    window.location.reload()
  }
}

export const auth = {
  useIsLoggedIn,
  login,
  logout,
  isLoggedIn,
  useHandle
}