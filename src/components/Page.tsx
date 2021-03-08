import { use100vh } from 'react-div-100vh'
import styled from 'styled-components'
import { ReactChildren } from '../types'

const StyledPage = styled.div<{ minHeight: number | null }>`
  min-height: ${({ minHeight }) => minHeight ? `${minHeight}px` : '100vh'};
  background-color: #000;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export function Page({
  children
}: {
  children: ReactChildren
}) {
  const height = use100vh();

  return (
    <StyledPage minHeight={height}>
      {children}
    </StyledPage>
  )
}