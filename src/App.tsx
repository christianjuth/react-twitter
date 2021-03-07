import * as React from 'react';
import { GlobalStyles, GlobalTextStyles, Accessibility } from './components'
import { Provider as GridProvider } from './components/Grid'
import { AppRouter } from './navigation/AppRouter'

function App() {
  return (
    <GridProvider>
      <GlobalStyles/>
      <GlobalTextStyles/>
      <Accessibility/>
      <AppRouter/>
    </GridProvider>
  )
}

export default App;