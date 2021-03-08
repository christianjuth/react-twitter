import cn from "classnames"
import React, { useContext } from "react"
import styled from "styled-components"
import { theme } from "../../utils"
import * as contextExports from "./context"
import { Context } from "./context"
import { BreakpointGenerator } from "./types"
import { computeBreakpoints } from "./utils"

export interface ColProps extends Partial<BreakpointGenerator<number>> {
  style?: React.CSSProperties
  children?: React.ReactNode
  className?: string
}

export interface RowProps {
  style?: React.CSSProperties
  children?: React.ReactNode
  spacing?: number | string
  className?: string
  cols?: string | number
  /**
   * This method of reversing is inaccessible
   * because it only reverses the order visually
   * and not for people using screen readers
   */
  inaccessiblyReverse?: boolean
}

export interface DisplayProps extends Partial<BreakpointGenerator<boolean>> {
  style?: React.CSSProperties
  children?: React.ReactNode
  className?: string
}

const ColStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  direction: ltr;

  @media ${theme.mediaQuery("xs", "sm")} {
    display: var(--gridDisplay-xs);
    grid-column-end: span var(--gridWidth-xs);
  }

  @media ${theme.mediaQuery("sm", "md")} {
    display: var(--gridDisplay-sm);
    grid-column-end: span var(--gridWidth-sm);
  }

  @media ${theme.mediaQuery("md", "lg")} {
    display: var(--gridDisplay-md);
    grid-column-end: span var(--gridWidth-md);
  }

  @media ${theme.mediaQuery("lg", "xl")} {
    display: var(--gridDisplay-lg);
    grid-column-end: span var(--gridWidth-lg);
  }

  @media ${theme.mediaQuery("xl", "xxl")} {
    display: var(--gridDisplay-xl);
    grid-column-end: span var(--gridWidth-xl);
  }

  @media ${theme.mediaQuery("xxl")} {
    display: var(--gridDisplay-xxl);
    grid-column-end: span var(--gridWidth-xxl);
  }
`

function Col(props: ColProps) {
  const { xs, sm, md, lg, xl, xxl, style, children, className } = props
  const computedBreakpoints = computeBreakpoints({
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  }) as any

  const vars: any = {}
  Object.keys(computedBreakpoints).forEach((breakpoint: any) => {
    vars[`--gridWidth-${breakpoint}`] = computedBreakpoints[breakpoint]
    vars[`--gridDisplay-${breakpoint}`] =
      computedBreakpoints[breakpoint] === 0 ? "none" : "flex"
  })

  return (
    <ColStyle
      style={{
        ...style,
        ...vars,
      }}
      className={cn(className, "col")}
    >
      {children}
    </ColStyle>
  )
}

const RowStyle = styled.div`
  display: grid;
  flex: 1;
  align-items: flex-start;
`

function Row({
  cols,
  spacing = 0,
  children,
  style,
  className,
  inaccessiblyReverse = false,
}: RowProps) {
  const context = {
    ...contextExports.defaultContextValue,
    breakPoint: useContext(Context).breakPoint,
  }

  if (typeof cols === "number") {
    cols = Array.from({ length: cols })
      .map(() => "1fr")
      .join(" ")
  }

  if (typeof spacing === "number") {
    spacing = spacing + "px"
  }

  return (
    <Context.Provider
      value={{
        ...context,
        cols: cols || context.cols,
      }}
    >
      <RowStyle
        className={className}
        style={{
          gridGap: spacing,
          gridTemplateColumns: cols ?? context.cols,
          direction: inaccessiblyReverse ? "rtl" : undefined,
          ...style,
        }}
      >
        {children}
      </RowStyle>
    </Context.Provider>
  )
}

export const Grid = {
  Row,
  Col,
}
