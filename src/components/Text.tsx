/* eslint jsx-a11y/heading-has-content: 0 */

import * as React from "react"
import { ReactChildren } from "../types"
import { createGlobalStyle } from "styled-components"
import cn from "classnames"
import { number, theme, Theme } from "../utils"

const htmlTags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "time",
  "blockquote",
  "label",
] as const
const variants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "link",
] as const

type GetArrayElementType<
  T extends readonly any[]
> = T extends readonly (infer U)[] ? U : never

export declare namespace Text {
  export interface TextElementProps {
    htmlTag?: HtmlTag
    className?: string
    style?: React.CSSProperties
    children: ReactChildren<string>
    numberOfLines?: number
    htmlFor?: string
  }

  export interface TextProps extends TextElementProps {
    /* Aria Label */
    ariaLabel?: string
    ariaHidden?: boolean
    variant?: Variant
    uppercase?: boolean
    noPadding?: boolean
    color?: Theme.Color
  }

  export type HtmlTag = GetArrayElementType<typeof htmlTags>
  export type Variant = GetArrayElementType<typeof variants>
}

const genName = (
  variant: Text.Variant | "truncate" | "numOfLines" | "no-padding" | "uppercase"
) => `Text-${variant}`

const TRUNCATE_CLASS = genName("truncate")
const NO_PADDING_CLASS = genName("no-padding")
const UPPERCASE_CLASS = genName("uppercase")
const NUM_OF_LINES_VAR = genName("numOfLines")
const SPACING_AFTER_TEXT = "10px"

export const GlobalTextStyles = createGlobalStyle`
  body, textarea {
    color: ${theme.color('text')};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .${genName("h1")} {
    font-size: ${number.pxToRem(55)};
    font-style: normal;
    font-weight: 800;
    line-height: 56px;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("h2")} {
    font-size: ${number.pxToRem(40)};
    font-style: normal;
    font-weight: normal;
    line-height: ${46 / 40}em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("h3")} {
    font-size: ${number.pxToRem(36)};
    font-style: normal;
    font-weight: 700;
    line-height: ${42 / 36}em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("h4")} {
    font-size: ${number.pxToRem(32)};
    font-style: normal;
    font-weight: 400;
    line-height: ${36 / 32}em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("h5")} {
    font-size: ${number.pxToRem(24)};
    font-style: normal;
    font-weight: 700;
    line-height: ${28 / 24}em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("h6")} {
    font-size: ${number.pxToRem(16)};
    font-style: normal;
    font-weight: 500;
    line-height: ${16 / 14}em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("p")} {
    font-size: ${number.pxToRem(20)};
    font-style: normal;
    font-weight: normal;
    line-height: ${30 / 20}em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("link")}, a {
    font-size: ${number.pxToRem(18)};
    font-style: normal;
    font-weight: normal;
    line-height: ${22 / 18}em;
    color: ${theme.color('accent1')};
    text-decoration: none;
  }
  .${TRUNCATE_CLASS} {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: var(--${NUM_OF_LINES_VAR});
    word-wrap: break-word;
  }
  .${NO_PADDING_CLASS} {
    margin: 0;
    padding: 0;
  }
  .${UPPERCASE_CLASS} {
    text-transform: uppercase;
    letter-spacing: 0.8em;
  }
`

function TextElement({ htmlTag = "span", ...props }: Text.TextElementProps) {
  switch (htmlTag) {
    case "h1":
      return <h1 {...props} />
    case "h2":
      return <h2 {...props} />
    case "h3":
      return <h3 {...props} />
    case "h4":
      return <h4 {...props} />
    case "h5":
      return <h5 {...props} />
    case "h6":
      return <h6 {...props} />
    case "p":
      return <p {...props} />
    case "time":
      return <time {...props} />
    case "blockquote":
      return <blockquote {...props} />
    default:
      return <span {...props} />
  }
}

export function Text({
  ariaLabel,
  ariaHidden,
  variant = "h1",
  numberOfLines,
  style,
  className,
  noPadding,
  uppercase,
  color,
  ...rest
}: Text.TextProps) {
  return (
    <TextElement
      className={cn(className, genName(variant), {
        [TRUNCATE_CLASS]: numberOfLines !== undefined,
        [NO_PADDING_CLASS]: noPadding,
        [UPPERCASE_CLASS]: uppercase
      })}
      style={{
        [`--${NUM_OF_LINES_VAR}`]: numberOfLines,
        color: color ? theme.color(color) : undefined,
        ...style
      }}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      {...rest}
    />
  )
}
Text.variants = variants
Text.htmlTags = htmlTags

export default Text