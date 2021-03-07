import * as React from 'react';
import { GlobalStyles, GlobalTextStyles, Accessibility } from './components'
import { AppRouter } from './navigation/AppRouter'

function App() {
  return (
    <>
      <GlobalStyles/>
      <GlobalTextStyles/>
      <Accessibility/>
      <AppRouter/>
    </>
  )
}

export default App;