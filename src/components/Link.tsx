/* eslint react/jsx-no-target-blank: 0 */

import cn from "classnames"
import { History } from "history"
import * as React from "react"
import { Link as DefaultLink, useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { Theme, theme, urls } from "../utils"

const CSS_CLASS = "Link"

const Button = styled.button`
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
`

export function Link({
  href,
  children,
  style,
  className,
  tabIndex,
  rel,
  role,
  onClick,
  linkRef: ref,
  color
}: {
  href?: string
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  tabIndex?: number
  rel?: string
  role?: string
  onClick?: () => any
  linkRef?: React.RefObject<any>
  color?: Theme.Color
}) {
  const navigate = useNavigate()
  const isInternal = urls.linkIsInternal(href)

  if (href === undefined && onClick !== undefined) {
    return (
      <Button
        className={cn(CSS_CLASS, className)}
        style={{
          color: color ? theme.color(color) : undefined,
          ...style
        }}
        tabIndex={tabIndex}
        role={role}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </Button>
    )
  }

  return isInternal ? (
    <DefaultLink
      to={href ?? ""}
      className={cn(CSS_CLASS, className)}
      style={{
        color: color ? theme.color(color) : undefined,
        ...style
      }}
      tabIndex={tabIndex}
      role={role}
      rel={rel}
      ref={ref}
      onClick={
        onClick
          ? (e) => {
              if (e.defaultPrevented && typeof href !== "undefined") {
                navigate(href)
              }
              onClick()
            }
          : undefined
      }
    >
      {children}
    </DefaultLink>
  ) : (
    <a
      href={href ?? "#"}
      rel={`noopener nofollow${rel ? " " + rel : ""}`}
      target="_blank"
      style={{
        color: color ? theme.color(color) : undefined,
        ...style
      }}
      className={cn(CSS_CLASS, className)}
      tabIndex={tabIndex}
      role={role}
      ref={ref}
      onClick={
        onClick
          ? (e) => {
              if (e.defaultPrevented && typeof href !== "undefined") {
                navigate(href)
              }
              onClick()
            }
          : undefined
      }
    >
      {children}
    </a>
  )
}

/**
 * This function may be useful if you want to
 * use the same logic the Link component uses outside
 *  of a normal link – maybe in a onClick function.
 */
Link.handleLinkIfInternal = (history: History, href?: string) => {
  const isInternal = urls.linkIsInternal(href)

  if (isInternal && href) {
    history.push(href)
    return true
  }

  return false
}

Link.CSS_CLASS = CSS_CLASS
export default Link