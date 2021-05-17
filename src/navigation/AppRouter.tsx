import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { navConfig } from './config'
import { api } from '../utils'
import * as Pages from '../pages'

export function AppRouter() {
  const isLoggedIn = api.useIsLoggedIn();

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Routes>
          {Object.entries(navConfig.routes).map(([key, config]) => (
            <Route 
              key={key}
              path={key}
              element={config.component} 
            />
          ))}
          <Route path='*' element={<Pages.NotFound/>}/>
        </Routes>
      ) : (
        <Pages.Login/>
      )}
    </BrowserRouter>
  )
}