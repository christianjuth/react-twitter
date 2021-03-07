import { createGlobalStyle } from 'styled-components'
import { theme } from '../utils/theme'
import { Link }  from './Link'

export const GlobalStyles = createGlobalStyle`
  :root {
    ${theme.cssVars}
  }

  html,
  body {
    padding: 0;
    margin: 0;
    background-color: ${theme.color('primary')};
  }

  a, h1, h2, h3, h4, h5, h6, input, textarea {
    color: ${theme.color('text')}
  }
`