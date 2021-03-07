import * as React from 'react'
import styled from 'styled-components'
import { theme } from '../utils'

const Horizontal = styled.hr<{ noPadding?: boolean }>`
  background-color: ${theme.color('divider')};
  border: none;
  height: 1px;
  width: 100%;
  ${({noPadding}) => noPadding ? `
    padding: 0;
    margin: 0;
  ` : ''}
`

const Vertical = styled.div`
  height: 100%;
  width: 1px;
  flex: 1;
  background-color: ${theme.color('divider')};
`

export function Divider({
  vertical,
  noPadding
}: {
  vertical?: boolean
  noPadding?: boolean
}) {
  if (vertical) {
    return (
      <Vertical/>
    )
  }

  return (
    <Horizontal noPadding={noPadding}/>
  )
}