import chroma from "chroma-js"
import { preserveTypes } from '../utils/preserveTypes'

// ---- Config ----
const colors = {
  primary: {
    main: '#000'
  },
  accent1: {
    main: '#1da1f2'
  },
  text: '#fff',
  textMuted: '#6e767d',
  divider: 'rgba(255,255,255,0.3)',
  disabled: '#eee',
  danger: '#e0245e'
}

const zIndexLevels = {
  header: 1000,
  modal: 1100,
  page: 0,
}

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}

// ---- Types ----
export declare namespace Theme {
  export type ColorSwatch = {
    light: string
    main: string
    dark: string
  }
  export type ColorVariant = "light" | "main" | "dark"
  export type Modifier = "contrastText"

  export type Breakpoint = keyof typeof breakpoints

  export type Color = keyof typeof colors
}

// ---- Color ----
const genColor = (
  key: Theme.Color,
  variant: Theme.ColorVariant,
  modifier?: Theme.Modifier
) => {
  const color: Partial<Theme.ColorSwatch> | string = colors[key]

  let colorSwatch: Partial<Theme.ColorSwatch> = {}

  if (typeof color === "string") {
    const chromaColor = chroma(color)
    colorSwatch = {
      light: chromaColor.brighten(1).hex(),
      main: chromaColor.hex(),
      dark: chromaColor.darken(2).saturate(1).hex(),
    }
  } else if (color?.main) {
    const chromaColor = chroma(color.main)
    colorSwatch = {
      light: color.light ?? chromaColor.brighten(1).hex(),
      main: chromaColor.hex(),
      dark: color.dark ?? chromaColor.darken(2).saturate(1).hex(),
    }
  } else if (color?.dark) {
    const chromaColor = chroma(color.dark)
    colorSwatch = {
      light: color.light ?? chromaColor.brighten(3).hex(),
      main: color.main ?? chromaColor.brighten(2).hex(),
      dark: chromaColor.hex(),
    }
  } else if (color?.light) {
    const chromaColor = chroma(color.light)
    colorSwatch = {
      light: chromaColor.hex(),
      main: color.main ?? chromaColor.darken(1).hex(),
      dark: color.main ?? chromaColor.darken(3).hex(),
    }
  }

  // We know this will be defined at this point
  const computedColor = colorSwatch[variant] as string

  switch (modifier) {
    case "contrastText":
      return chroma(computedColor).get("lab.l") < 70 ? "#ffffff" : "#000000"
    default:
      return computedColor
  }
}

const colorVariants: Theme.ColorVariant[] = ["light", "main", "dark"]
const modifiers: Theme.Modifier[] = ["contrastText"]


const genVarName = (
  key: Theme.Color,
  variant: Theme.ColorVariant = "main",
  modifier?: Theme.Modifier
) => {
  return "--" + [key, variant, modifier].filter(Boolean).join("-")
}

const cssVars = preserveTypes
  .ObjectKeys(colors)
  .map((color) =>
    colorVariants.map((variant) => [
      `${genVarName(color, variant)}: ${genColor(color, variant)};`,
      ...modifiers.map(
        (modifier) =>
          `${genVarName(color, variant, modifier)}: ${genColor(
            color,
            variant,
            modifier
          )};`
      ),
    ])
  )
  .flat()
  .flat()

// ---- Z-Index ----
function zIndex(base: keyof typeof zIndexLevels, shift: number = 0) {
  return zIndexLevels[base] + shift
}

// ---- mediaQuery ----
const mediaQuery = (lower?: Theme.Breakpoint, upper?: Theme.Breakpoint) => {
  let query = "only screen"

  if (lower) {
    query += " and (min-width: " + breakpoints[lower] + "px)"
  }

  if (upper) {
    query += " and (max-width: " + breakpoints[upper] + "px)"
  }

  return query
}

export const theme = {
  zIndex,
  cssVars,
  color: (...args: Parameters<typeof genVarName>) => {
    return `var(${genVarName(...args)})`
  },
  mediaQuery,
  roundness: (multiplier: number) => {
    return 12 * multiplier
  },
  spacing: (...multipliers: number[]) => {
    return multipliers
      .map((multiplier) => {
        return multiplier * 5 + "px"
      })
      .join(" ")
  },
}