import * as React from 'react';
import styled from 'styled-components';
import { ActivityIndicatorLayout, Button, Input, Page, Text } from '../components';
import { api } from '../utils';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  width: 300px;
`

export function Login() {
  const [ username, setUsername ] = React.useState('')
  const [ password, setPassword ] = React.useState('')

  async function login() {
    try {
      await api.login({ username, password })
      window.location.reload()
    } catch(e) {
      alert(e)
    }
  }

  return (
    <Page>
      <Form
        onSubmit={e => {
          e.preventDefault()
          login()
        }}
      >
        <Text variant='h3'>Login</Text>
        <Input
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
        <Button>Login</Button>
      </Form>
    </Page>
  )
}