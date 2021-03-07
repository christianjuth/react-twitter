import * as React from 'react'
import { theme } from '../utils'
import styled from 'styled-components'
import { Button } from './Button'
import { Text } from './Text'
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
  padding: ${theme.spacing(3)};
  border-bottom: 1px solid ${theme.color('divider')};
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding-top: ${theme.spacing(1)};
`

const CounterWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: ${theme.spacing(2)};
`

function Counter({ 
  numChars
}: {
  numChars: number
}) {
  const remainingChars = 280 - numChars

  let color = theme.color('accent1')
  if (remainingChars <= 0) {
    color = theme.color('danger')
  } else if (remainingChars <= 20) {
    color = theme.color('warning')
  }

  const size = 22;
  const r = size/2;
  const circleLength = 2*Math.PI*r;
  const colored = (circleLength*numChars)/280;
  const gray = circleLength - colored > 0 ? circleLength - colored : 0;

  return (
    <CounterWrap>
      {remainingChars <= 0 ? (
        <Text 
          variant='p' 
          noPadding 
          color="danger"
        >
          {remainingChars}
        </Text>
      ) : null}
      <svg style={{
        height: size + 4,
        width: size + 4,
        marginLeft: theme.spacing(1),
        transform: 'rotate(-90deg)'
      }}>
        <circle id="gray" cx="50%" cy="50%" r={r}
          style={{
            strokeWidth: 4,
            stroke: theme.color('textMuted')
          }}
        />
        <circle id="colored" cx="50%" cy="50%" r={r}
          style={{
            stroke: color,
            strokeWidth: 4,
            strokeDasharray: `${colored} ${gray}`
          }}
        />
      </svg>
    </CounterWrap>
  )
}

export function CreateTweet({
  onCreated,
  parentId
}: {
  onCreated: (tweet: API.Tweet) => any
  parentId?: string
}) {
  const [ message, setMessage ] = React.useState('')
  const handle = auth.useHandle();

  async function handleSubmit() {
    if (handle) {
      try {
        const tweet = await api.createTweet({
          handle,
          message,
          parentId
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
        placeholder={parentId ? "Tweet your reply." : "What's happening?"}
      />
      <Footer>
        <Counter
          numChars={message.length}
        />
        <Button 
          htmlType='submit'
          size='sm'
        >
          Tweet
        </Button>
      </Footer>
    </TweetWrap>
  )
}