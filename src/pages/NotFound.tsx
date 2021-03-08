import * as React from 'react';
import styled from 'styled-components';
import { Button, Layout, Text } from '../components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  flex: 1;
`

export function NotFound() {
  return (
    <Layout>
      <Card>
        <Text variant='h1'>404.</Text>
        <Text variant='h2' noPadding>Not found.</Text>
        <br/>
        <Button href='/' variant='outlined'>Return home</Button>
      </Card>
    </Layout>
  )
}