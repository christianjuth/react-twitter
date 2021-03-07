import * as React from 'react';
import styled from 'styled-components';
import { Page, Text, Button } from '../components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  align-content: flex-start;
`

export function NotFound() {
  return (
    <Page>
      <Card>
        <Text variant='h1'>404.</Text>
        <Text variant='h2' noPadding>Not found.</Text>
        <br/>
        <Button href='/'>Return home</Button>
      </Card>
    </Page>
  )
}