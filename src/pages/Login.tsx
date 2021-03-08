import * as React from 'react';
import styled from 'styled-components';
import { ActivityIndicatorLayout, Button, Input, Page, Text } from '../components';
import { auth } from '../utils';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  width: 300px;
`

export function Login() {
  const [ handle, setHandle ] = React.useState('')
  const isLoggedIn = auth.useIsLoggedIn()

  if (isLoggedIn === undefined) {
    return <ActivityIndicatorLayout/>
  }

  function handleLogin() {
    try {
      auth.login(handle)
    } catch(e) {
      alert(e)
    }
  }

  return (
    <Page>
      <Form
        onSubmit={e => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <Text variant='h3'>Login</Text>
        <Input
          placeholder='Twitter handle'
          value={handle}
          onChange={e => setHandle(e.target.value)}
        />
        <br/>
        <Button>Login</Button>
      </Form>
    </Page>
  )
}