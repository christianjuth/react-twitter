import React from "react"
import styled from "styled-components"
import { pxToRem, theme, Theme } from "../utils"
import { Link } from "./Link"
import { GenericProps } from "../types"

const StyledButton = styled.button<{
  size: Button.Size
  variant: Button.Variant
  color: Button.Color
  fullWidth: boolean
  uppercase: boolean
}>`
  border: 2px solid ${({ color }) => theme.color(color)};
  border-radius: ${theme.roundness(2)}px;
  padding: 0;
  background: transparent;
  line-height: 1em;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  &[disabled],
  &[disabled]:hover {
    border-color: ${theme.color("disabled")};
    background-color: ${theme.color("disabled")};
    color: ${theme.color("textMuted")};
    cursor: not-allowed;
  }
  ${({ uppercase }) =>
    uppercase
      ? `
    text-transform: uppercase;
  `
      : ""}
  ${({ fullWidth }) =>
    fullWidth
      ? `
    width: 100%;
  `
      : ""}
  ${({ size }) => {
    switch (size) {
      case "sm":
        return `
          font-size: 1.05rem;
          padding: ${pxToRem(9)} ${pxToRem(10)};
        `
      case "md":
        return `
          font-size: 1.3rem;
          padding: ${pxToRem(12)} ${pxToRem(26)};
        `
      case "lg":
        return `
          font-size: 1.5rem;
          padding: ${pxToRem(16)} ${pxToRem(28)};
        `
    }
  }}
  ${({ variant }) => {
    switch (variant) {
      case "contained":
        return ({ color }) => `
          &, &:hover, &:active {
            background-color: ${theme.color(color)};
            color: ${theme.color(color, "main", "contrastText")};
          }
        `
      case "outlined":
        return ({ color }) => `
          transition: background-color 0.2s, color 0.2s;
          color: ${theme.color(color)};
          &:hover {
            background-color: ${theme.color(color)};
            color: ${theme.color(color, "main", "contrastText")};
          }
        `
    }
  }}
`

const StyledLink = styled(Link)<{
  size: Button.Size
  variant: Button.Variant
  color: Button.Color
  fullWidth: boolean
  uppercase: boolean
  disabled: boolean
}>`
  display: block;
  border: 2px solid ${({ color }) => theme.color(color)};
  border-radius: ${theme.roundness(2)}px;
  padding: 0;
  background: transparent;
  line-height: 1em;
  font-weight: bold;
  letter-spacing: 0.06em;
  font-style: italic;
  cursor: pointer;
  text-align: center;
  ${({ disabled }) =>
    disabled
      ? `
    border-color: ${theme.color("disabled")};
    background-color: ${theme.color("disabled")};
    color: ${theme.color("textMuted")};
    cursor: not-allowed;
`
      : ""}
  ${({ uppercase }) =>
    uppercase
      ? `
    text-transform: uppercase;
  `
      : ""}
  ${({ fullWidth }) =>
    fullWidth
      ? `
    width: 100%;
  `
      : ""}
  ${({ size }) => {
    switch (size) {
      case "sm":
        return `
          font-size: 1.05rem;
          padding: ${pxToRem(9)} ${pxToRem(10)};
        `
      case "md":
        return `
          font-size: 1.3rem;
          padding: ${pxToRem(12)} ${pxToRem(26)};
        `
      case "lg":
        return `
          font-size: 1.5rem;
          padding: ${pxToRem(16)} ${pxToRem(28)};
        `
    }
  }}
  ${({ variant }) => {
    switch (variant) {
      case "contained":
        return ({ color }) => `
          &, &:hover, &:active {
            background-color: ${theme.color(color)};
            color: ${theme.color(color, "main", "contrastText")};
          }
        `
      case "outlined":
        return ({ color }) => `
          transition: background-color 0.2s, color 0.2s;
          color: ${theme.color(color)};
          &:hover {
            background-color: ${theme.color(color)};
            color: ${theme.color(color, "main", "contrastText")};
          }
        `
    }
  }}
`

export declare namespace Button {
  export type Size = GenericProps.Size
  export type Variant = "contained" | "outlined"
  export type Color = Theme.Color

  export type Props = {
    children: React.ReactNode
    style?: React.CSSProperties
    href?: string
    onClick?: any
    disabled?: boolean
    size?: Size
    htmlType?: "submit"
    className?: string
    variant?: Variant
    color?: Color
    onClickSideEffect?: () => any
    fullWidth?: boolean
    uppercase?: boolean
    type?: "button" | "submit" | "reset"
  }
}

export function Button({
  children,
  style,
  href,
  disabled = false,
  onClick,
  size = "md",
  variant = "contained",
  className,
  color = "accent1",
  fullWidth = false,
  uppercase = false,
  type,
}: Button.Props) {
  return typeof href === "string" ? (
    <StyledLink
      disabled={disabled}
      size={size}
      className={className}
      variant={variant}
      style={style}
      href={href}
      color={color}
      fullWidth={fullWidth}
      uppercase={uppercase}
    >
      {children}
    </StyledLink>
  ) : (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      size={size}
      className={className}
      variant={variant}
      style={style}
      color={color}
      fullWidth={fullWidth}
      uppercase={uppercase}
      type={type}
    >
      {children}
    </StyledButton>
  )
}

export default Button