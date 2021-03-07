const root = "https://rumad-backend-monorepo.herokuapp.com/twitter"

const api = (url: string) => `${root}/${url.replace(/^\//, '')}`

const routes = {
  profile: (handle?: string) => ['/profile', handle].filter(Boolean).join('/'),
  tweet: (id?: string) => ['/tweets', id].filter(Boolean).join('/'),
  home: () => '/',
  explore: () => '/explore'
}

function getLocationHref() {
  if (typeof window !== 'undefined') {
    return location.href.replace(/(^.+\/\/|\/$)/g, '')
  }
  return ""
}

function linkIsInternal(href?: string) {
  if (typeof href === "undefined") {
    return false
  }

  // e.g. "https://docs.google.com/id" -> "docs.google.com"
  const hrefHost = href ? href.match(/(https{0,1}:\/\/|^)([^/]+)/)?.[2] : ""

  let isInternal = false

  const regex = `^([a-zA-Z0-9_-]\\.|)${getLocationHref()}$`

  if (hrefHost && new RegExp(regex, "i").test(hrefHost)) {
    isInternal = true
  } else if (typeof href !== "undefined") {
    // match "/[page]" but not "//domain.com"
    isInternal = /^\/([^\/]|$)/.test(href)
  }

  return isInternal
}


export const urls = {
  api,
  routes,
  linkIsInternal
}