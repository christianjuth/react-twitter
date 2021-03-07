import * as React from 'react'
import { theme } from '../utils'
import styled from 'styled-components'
import { Button } from './Button'
import { API, api } from '../api'
import { auth } from '../utils'

const TextArea = styled.textarea`
  resize: none;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  flex: 1;
  width: 100%;
`

const TweetWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: ${theme.spacing(2)};
`

export function CreateTweet({
  onCreated
}: {
  onCreated: (tweet: API.Tweet) => any
}) {
  const [message, setMessage] = React.useState('')
  const handle = auth.useHandle();

  async function handleSubmit() {
    if (handle) {
      try {
        const tweet = await api.createTweet({
          handle,
          message
        })
        if (tweet) {
          onCreated(tweet)
          setMessage('')
        }
      } catch(e) {
        alert(e);
      }
    }
  }

  return (
    <TweetWrap
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <TextArea 
        rows={4}
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="What's happening?"
      />
      <Button 
        htmlType='submit'
        // disabled={message.length < 2}
      >
        Tweet
      </Button>
    </TweetWrap>
  )
}