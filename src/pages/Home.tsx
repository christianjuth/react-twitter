import * as React from 'react';
import { Layout, Navbar, Tweet, Join, Divider, CreateTweet, ActivityIndicatorScreen } from '../components';
import { API, api } from '../api'

export function Home() {
  const [tweets] = api.useTweets();
  const [deletedTweets, setDeletedTweets] = React.useState<string[]>([])
  const [patchedTweets, setPatchedTweets] = React.useState<API.Tweet[] | null>(null)

  React.useEffect(() => {
    setPatchedTweets(tweets)
  }, [tweets])

  if (patchedTweets === null) {
    return <ActivityIndicatorScreen/>
  }

  return (
    <Layout>
      <Navbar title='Home'/>
      <Join separator={<Divider noPadding/>}>
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
          />
        ) : null)}
      </Join>
    </Layout>
  )
}