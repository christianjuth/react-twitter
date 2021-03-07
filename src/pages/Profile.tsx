import * as React from 'react';
import { Layout, Navbar, Divider, Join, Tweet, ActivityIndicatorLayout } from '../components';
import { auth } from '../utils';
import { api } from '../api'
import { useParams } from 'react-router-dom'

export function Profile() {
  const { handle: handleParam } = useParams()
  const authHandle = auth.useHandle()
  const handle = handleParam ?? authHandle
  const [ tweets ] = api.useProfile(handle);
  const [deletedTweets, setDeletedTweets] = React.useState<string[]>([])

  if (tweets === null) {
    return <ActivityIndicatorLayout/>
  }

  return (
    <Layout>
      <Navbar title={handle ?? 'Profile'}/>
      {tweets.map(t => deletedTweets.indexOf(t.id) === -1 ? (
        <Tweet
          key={t.id}
          handle={t.handle}
          date={t.createdAt}
          message={t.message}
          tweetId={t.id}
          disableProfileLink
          onDelete={() => {
            setDeletedTweets(deleted => [...deleted, t.id])
          }}
          likes={t.likes}
        />
      ) : null)}
    </Layout>
  )
}