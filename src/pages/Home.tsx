import * as React from 'react';
import { API, api } from '../api';
import { ActivityIndicatorLayout, CreateTweet, Layout, Navbar, Tweet } from '../components';

export function Home() {
  const [ tweets ] = api.useTweets();
  const [ deletedTweets, setDeletedTweets ] = React.useState<string[]>([])
  const [ patchedTweets, setPatchedTweets ] = React.useState<API.Tweet[] | null>(null)

  React.useEffect(() => {
    setPatchedTweets(tweets)
  }, [tweets])

  if (patchedTweets === null) {
    return <ActivityIndicatorLayout/>
  }

  return (
    <Layout>
      <Navbar title='Home'/>
      <CreateTweet
        onCreated={newTweet => setPatchedTweets(t => t ? [newTweet, ...t] : null)}
      />
      {patchedTweets.map(t => deletedTweets.indexOf(t.id) === -1 ? (
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