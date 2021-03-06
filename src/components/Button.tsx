import React from "react"
import styled from "styled-components"
import { number, theme, Theme } from "../utils"
import { Link } from "./Link"
import { GenericProps } from "../types"

const StyledButton = styled.button<{
  size: Button.Size
  variant: Button.Variant
  customColor: Button.Color
  fullWidth: boolean
  uppercase: boolean
}>`
  border: 2px solid ${({ customColor }) => theme.color(customColor)};
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
          padding: ${number.pxToRem(10)} ${number.pxToRem(14)};
        `
      case "md":
        return `
          font-size: 1.3rem;
          padding: ${number.pxToRem(12)} ${number.pxToRem(26)};
        `
      case "lg":
        return `
          font-size: 1.5rem;
          padding: ${number.pxToRem(16)} ${number.pxToRem(28)};
        `
    }
  }}
  ${({ variant }) => {
    switch (variant) {
      case "contained":
        return ({ customColor }) => `
          &, &:hover, &:active {
            background-color: ${theme.color(customColor)};
            color: ${theme.color(customColor, "main", "contrastText")};
          }
        `
      case "outlined":
        return ({ customColor }) => `
          transition: background-color 0.2s, color 0.2s;
          color: ${theme.color(customColor)};
          &:hover {
            background-color: ${theme.color(customColor)};
            color: ${theme.color(customColor, "main", "contrastText")};
          }
        `
    }
  }}
`

const StyledLink = styled(Link)<{
  size: Button.Size
  variant: Button.Variant
  customColor: Button.Color
  fullWidth: boolean
  uppercase: boolean
  disabled: boolean
}>`
  border: 2px solid ${({ customColor }) => theme.color(customColor)};
  border-radius: ${theme.roundness(2)}px;
  padding: 0;
  background: transparent;
  line-height: 1em;
  font-weight: bold;
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
          padding: ${number.pxToRem(10)} ${number.pxToRem(14)};
        `
      case "md":
        return `
          font-size: 1.3rem;
          padding: ${number.pxToRem(12)} ${number.pxToRem(26)};
        `
      case "lg":
        return `
          font-size: 1.5rem;
          padding: ${number.pxToRem(16)} ${number.pxToRem(28)};
        `
    }
  }}
  ${({ variant }) => {
    switch (variant) {
      case "contained":
        return ({ customColor }) => `
          &, &:hover, &:active {
            background-color: ${theme.color(customColor)};
            color: ${theme.color(customColor, "main", "contrastText")};
          }
        `
      case "outlined":
        return ({ customColor }) => `
          transition: background-color 0.2s, color 0.2s;
          color: ${theme.color(customColor)};
          &:hover {
            background-color: ${theme.color(customColor)};
            color: ${theme.color(customColor, "main", "contrastText")};
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
      customColor={color}
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
      customColor={color}
      fullWidth={fullWidth}
      uppercase={uppercase}
      type={type}
    >
      {children}
    </StyledButton>
  )
}

export default Button