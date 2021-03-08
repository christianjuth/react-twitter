import * as React from 'react';
import { ActivityIndicatorLayout, CreateTweet, Layout, Navbar, Tweet } from '../components';
import { api } from '../utils/api';
import { NotFound } from './NotFound'

export function Home() {
  const tweets = api.useTweets();
  const [ deletedTweets, setDeletedTweets ] = React.useState<string[]>([])

  if (tweets.status === 'error') {
    return <NotFound/>
  }

  if (tweets.data === null) {
    return <ActivityIndicatorLayout/>
  }

  return (
    <Layout>
      <Navbar title='Home'/>
      <CreateTweet
        onCreated={tweets.refresh}
      />
      {tweets.data.map(t => deletedTweets.indexOf(t.id) === -1 ? (
        <Tweet
          key={t.id}
          handle={t.handle}
          date={t.createdAt}
          message={t.message}
          tweetId={t.id}
          onDelete={() => {
            setDeletedTweets(deleted => [...deleted, t.id])
          }}
          likes={t.likes}
        />
      ) : null)}
    </Layout>
  )
}