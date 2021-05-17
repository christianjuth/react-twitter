import * as React from 'react'
import { api } from './api'
const LOCAL_STORAGE_KEY = 'twitter-userName'

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

async function login({
  username,
  password
}: {
  username: string
  password: string
}) {
  username = username.toLowerCase()
  const test = await api.login({ username, password })
  console.log(test)
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