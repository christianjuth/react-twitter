import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ActivityIndicatorLayout, Layout, Navbar, Tweet } from '../components';
import { auth } from '../utils';
import { api } from '../utils/api';
import { NotFound } from './NotFound';

export function Profile() {
  const { handle: handleParam } = useParams()
  const authHandle = auth.useHandle()
  const handle = handleParam ?? authHandle
  const tweets = api.useProfile(handle);
  const [ deletedTweets, setDeletedTweets ] = React.useState<string[]>([])

  if (tweets.status === 'error') {
    return <NotFound/>
  }

  if (tweets.data === null) {
    return <ActivityIndicatorLayout/>
  }

  return (
    <Layout>
      <Navbar title={handle ?? 'Profile'}/>
      {tweets.data.map(t => deletedTweets.indexOf(t.id) === -1 ? (
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