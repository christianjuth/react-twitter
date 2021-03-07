import * as React from 'react'
import styled from 'styled-components'
import { Text } from './Text'
import { Link } from './Link'
import { Divider } from './Divider'
import { theme, urls, auth } from '../utils'
import { useParams, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { IoTrashOutline } from 'react-icons/io5'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { api } from '../api'

const TweetWrap = styled.button`
  background: transparent;
  margin: 0;
  border: none;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(3)};
  color: ${theme.color('text')};
  text-align: left;
  border-bottom: 1px solid ${theme.color('divider')};
  cursor: pointer;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-bottom: ${theme.spacing(1)};
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: ${theme.spacing(1)};
`

const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export function Tweet({
  disableProfileLink,
  message,
  date,
  handle,
  tweetId,
  onDelete,
  large,
  replyHandle,
  likes
}: {
  disableProfileLink?: boolean
  message: string
  date: string
  handle: string
  tweetId: string
  onDelete: () => any
  large?: boolean
  replyHandle?: string
  likes: number
}) {
  const authHandle = auth.useHandle()
  const { handle: profile, tweetId: paramTweetId } = useParams()
  const [liked, setLiked] = React.useState(false)
  const navigate = useNavigate()

  return (
    <TweetWrap
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        if (paramTweetId !== tweetId) {
          navigate(urls.routes.tweet(tweetId))
        }
      }}
    >
      <Header>
        <Text variant='h6' color='textMuted' noPadding>
          {(handle !== profile && !disableProfileLink) ? (
            <Link 
              href={urls.routes.profile(handle)}
              color='text'
            >
              @{handle}
            </Link>
          ) : (
            `@${handle}`
          )}
          {'  ·  '}{dayjs(date).format('MMM D, YYYY')}
        </Text>

        {handle === authHandle ? (
          <IconButton 
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
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

      {replyHandle ? (
        <Header>
          <Text variant='h6' color='textMuted' noPadding>
            {'Replying to '}
            {(replyHandle !== profile && !disableProfileLink) ? (
              <Link href={urls.routes.profile(replyHandle)}>@{replyHandle}</Link>
            ) : (
              `@${replyHandle}`
            )}
          </Text>
        </Header>
      ) : null}

      <Text variant={large ? 'h4' : 'p'} noPadding>{message}</Text>

      {large ? (
        <Divider/>
      ) : null}

      <Footer>
        <IconButton
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            setLiked(true)
            api.likeTweet(tweetId)
          }}
          style={{
            color: liked ? theme.color('danger') : theme.color('textMuted')
          }}
        >
          {liked ? (
            <AiFillHeart
            size={large ? 25 : 22}
            />
          ) : (
            <AiOutlineHeart
              size={large ? 25 : 22}
            />
          )}
          {likes > 0 ? (
            <Text 
              variant='p' 
              noPadding
              style={{
                marginLeft: theme.spacing(1)
              }}
            >
              {likes + Number(liked)}
            </Text>
          ) : null}
        </IconButton>
      </Footer>
    </TweetWrap>
  )
}