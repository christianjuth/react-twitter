import * as React from 'react';
import { API, api } from '../api';
import { ActivityIndicatorLayout, Divider, Layout, Navbar } from '../components';

export function Explore() {
  const [tweets] = api.useTweets();
  const [patchedTweets, setPatchedTweets] = React.useState<API.Tweet[] | null>(null)

  if (patchedTweets === null) {
    return <ActivityIndicatorLayout/>
  }

  return (
    <Layout>
      <Navbar title='Explore'/>
      <Divider noPadding/>
    </Layout>
  )
}