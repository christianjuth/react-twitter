import * as React from 'react'
import styled from 'styled-components'
import { AppBar } from '../navigation/AppBar'
import { Sidebar } from '../navigation/Sidebar'
import { ReactChildren } from '../types'
import { Divider } from './Divider'
import { Grid } from './Grid'
import { Page } from './Page'

const MainGutters = styled.div`
  max-width: 680px;
  width: 100%;
  min-height: 100%;
`

export function Layout({
  children,
}: {
  children: ReactChildren
}) {
  return (
    <Page>
      <MainGutters>
        <Grid.Row cols={`auto 1px 1fr 1px`} style={{minHeight: '100%'}}>
          <Grid.Col xs={0} md={1} style={{minHeight: '100%'}}>
            <Sidebar/>
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{minHeight: '100%'}}>
            <Divider vertical/>
          </Grid.Col>

          <Grid.Col xs={4} md={1} style={{minHeight: '100%'}}>
            {children}
            <AppBar.Spacer/>
          </Grid.Col>

          <Grid.Col xs={0} md={1} style={{minHeight: '100%'}}>
            <Divider vertical/>
          </Grid.Col>
        </Grid.Row>
      </MainGutters>
      <AppBar/>
    </Page>
  )
}