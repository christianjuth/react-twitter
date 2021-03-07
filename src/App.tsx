import * as React from 'react';
import { GlobalStyles, GlobalTextStyles, Accessibility } from './components'
import { Provider as GridProvider } from './components/Grid'
import { AppRouter } from './navigation/AppRouter'
import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <HelmetProvider>
      <GridProvider>
        <GlobalStyles/>
        <GlobalTextStyles/>
        <Accessibility/>
        <AppRouter/>
      </GridProvider>
    </HelmetProvider>
  )
}

export default App;