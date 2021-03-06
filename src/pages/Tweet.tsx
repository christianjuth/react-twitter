import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActivityIndicatorLayout, CreateTweet, Layout, Navbar, Tweet as TweetCard } from '../components';
import { api, urls } from '../utils';
import { NotFound } from './NotFound';

export function Tweet() {
  const { tweetId } = useParams()
  const tweets = api.useTweet(tweetId);
  const navigate = useNavigate()

  if (tweets.status === 'error') {
    return <NotFound/>
  }

  if (tweets.data === null || tweets.data[0]?.id !== tweetId) {
    return <ActivityIndicatorLayout/>
  }

  return (
    <Layout>
      <Navbar title='Home'/>
      {tweets.data.map(t => (
        <TweetCard
          key={t.id}
          handle={t.username}
          replyHandle={t.id !== tweetId ? tweets.data?.[0].username : undefined}
          date={t.createdAt}
          message={t.message}
          tweetId={t.id}
          onDelete={() => {
            if (t.id === tweetId) {
              navigate(urls.routes.home())
            } else {
              tweets.refresh()
            }
          }}
          large={t.id === tweetId}
          likes={t.likes}
        />
      ))}
      <CreateTweet
        onCreated={tweets.refresh}
        parentId={tweetId}
      />
    </Layout>
  )
}