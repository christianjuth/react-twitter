import styled from 'styled-components'
import { Text } from './Text'
import { Link } from './Link'
import { theme, urls, auth } from '../utils'
import { useParams, useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import { IoTrashOutline } from 'react-icons/io5'
import { api } from '../api'

const TweetWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(2)};
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`

export function Tweet({
  disableProfileLink,
  message,
  date,
  handle,
  tweetId,
  onDelete
}: {
  disableProfileLink?: boolean
  message: string
  date: string
  handle: string
  tweetId: string
  onDelete: () => any
}) {
  const authHandle = auth.useHandle()
  const { handle: profile } = useParams()

  return (
    <TweetWrap>
      <Header>
        <Text variant='h6' color='textMuted'>
          {(handle !== profile && !disableProfileLink) ? (
            <Link href={urls.routes.profile(handle)}>@{handle}</Link>
          ) : (
            `@${handle}`
          )}
          {'  ·  '}{dayjs(date).format('MMM D, YYYY')}
        </Text>

        {handle === authHandle ? (
          <IconButton 
            onClick={() => {
              api.deleteTweet(tweetId)
              onDelete()
            }}
          >
            <IoTrashOutline
              size={20}
              color={'#f00'}
            />
          </IconButton>
        ) : null}
      </Header>

      <Text variant='p' noPadding>{message}</Text>
    </TweetWrap>
  )
}