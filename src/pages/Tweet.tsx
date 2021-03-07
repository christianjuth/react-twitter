import * as React from 'react';
import { useParams } from 'react-router-dom';
import { API, api } from '../api';
import { ActivityIndicatorLayout, CreateTweet, Layout, Navbar, Tweet as TweetCard } from '../components';
import { NotFound } from './NotFound'
import { useNavigate } from 'react-router-dom'
import { urls } from '../utils'

export function Tweet() {
  const { tweetId } = useParams()
  const [ tweets, status ] = api.useTweet(tweetId);
  const [ deletedTweets, setDeletedTweets ] = React.useState<string[]>([])
  const [ patchedTweets, setPatchedTweets ] = React.useState<API.Tweet[] | null>(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (status === 'success') {
      setPatchedTweets(tweets)
    } else {
      setPatchedTweets(null)
    }
  }, [tweets, status])

  if (status === 'error') {
    return <NotFound/>
  }

  if (patchedTweets === null || patchedTweets[0].id !== tweetId) {
    return <ActivityIndicatorLayout/>
  }

  return (
    <Layout>
      <Navbar title='Home'/>
      {patchedTweets.map(t => deletedTweets.indexOf(t.id) === -1 ? (
        <TweetCard
          key={t.id}
          handle={t.handle}
          replyHandle={t.id !== tweetId ? patchedTweets?.[0].handle : undefined}
          date={t.createdAt}
          message={t.message}
          tweetId={t.id}
          onDelete={() => {
            if (t.id === tweetId) {
              navigate(urls.routes.home())
            }
            setDeletedTweets(deleted => [...deleted, t.id])
          }}
          large={t.id === tweetId}
          likes={t.likes}
        />
      ) : null)}
      <CreateTweet
        onCreated={newTweet => setPatchedTweets(t => t ? [...t, newTweet] : null)}
        parentId={tweetId}
      />
    </Layout>
  )
}