/**
 * This component intelligently disables CSS outlines when accessibility
 * is not affected. In most cases, it's a bad idea to remove outlines from
 * HTML elements because outlines are important for navigating the site
 * with a keyboard. It's ok to hide outlines as long as they're only hidden
 * for mouse and touch events. When the user navigates the site with a
 * keyboard, outlines should be shown.
 *
 * See the following articles for more info.
 * https://www.a11yproject.com/posts/2013-01-25-never-remove-css-outlines/
 * https://jmperezperez.com/outline-focus-ring-a11y/
 * https://css-irl.info/accessibly-hiding-focus-outlines/
 */

import * as React from "react"
import { createGlobalStyle } from "styled-components"

const accessibilityKeys = [
  "Tab",
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Escape",
]

const GlobalStyle = createGlobalStyle<{
  enableOutline: boolean
}>`
  ${({ enableOutline }) =>
    !enableOutline
      ? `
    :focus {
      outline: 0;
    }
    ::-moz-focus-inner {
      border: 0;
    }
  `
      : ""}
`

export function Accessibility() {
  const [enableOutline, setEnableOutline] = React.useState(true)

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      function handleMousedown() {
        setEnableOutline(false)
      }

      function handleTouchstart() {
        setEnableOutline(false)
      }

      function handleKeydown(e: KeyboardEvent) {
        if (accessibilityKeys.includes(e.key)) {
          setEnableOutline(true)
        }
      }

      document.addEventListener("mousedown", handleMousedown)
      document.addEventListener("touchstart", handleTouchstart)
      document.addEventListener("keydown", handleKeydown)

      return () => {
        document.removeEventListener("mousedown", handleMousedown)
        document.removeEventListener("touchstart", handleTouchstart)
        document.removeEventListener("keydown", handleKeydown)
      }
    }
  }, [])

  return <GlobalStyle enableOutline={enableOutline} />
}