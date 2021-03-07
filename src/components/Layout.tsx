import * as React from 'react'
import styled from 'styled-components'
import { Page } from './Page'
import { Grid } from './Grid'
import { Divider } from './Divider'
import { Sidebar } from '../navigation/Sidebar'
import { AppBar } from '../navigation/AppBar'
import { ReactChildren } from '../types'
import { useLocation } from 'react-router-dom'

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