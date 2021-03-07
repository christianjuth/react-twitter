import * as React from 'react'
import styled from 'styled-components'
import { Page } from './Page'
import { Grid } from './Grid'
import { useGrid } from './Grid/context'
import { Divider } from './Divider'
import { Sidebar } from '../navigation/Sidebar'
import { ReactChildren } from '../types'

const MainGutters = styled.div`
  max-width: 700px;
  width: 100%;
  min-height: 100%;
`

export function Layout({
  children,
}: {
  children: ReactChildren
}) {
  const { breakPoint } = useGrid();

  return (
    <Page>
      <MainGutters>
        <Grid.Row cols={`auto 1px 1fr 1px`} style={{minHeight: '100%'}}>
          <Grid.Col xs={1} style={{minHeight: '100%'}}>
            <Sidebar/>
          </Grid.Col>

          <Grid.Col xs={1} style={{minHeight: '100%'}}>
            <Divider vertical/>
          </Grid.Col>

          <Grid.Col xs={1}>
            {children}
          </Grid.Col>

          <Grid.Col xs={1} style={{minHeight: '100%'}}>
            <Divider vertical/>
          </Grid.Col>
        </Grid.Row>
      </MainGutters>
    </Page>
  )
}