import { GiBirdHouse } from 'react-icons/gi'
import { BsPerson } from 'react-icons/bs'
import * as Pages from '../pages'

const routes: Record<string, {
  title: string
  component: JSX.Element
  icon: JSX.Element
  showInSidebar?: boolean
}> = {
  '/': {
    title: 'Home',
    component: <Pages.Home/>,
    icon: <GiBirdHouse size={32}/>,
    showInSidebar: true
  },
  '/profile': {
    title: 'Profile',
    component: <Pages.Profile/>,
    icon: <BsPerson size={32}/>,
    showInSidebar: true
  },
  '/profile/:handle': {
    title: 'Profile',
    component: <Pages.Profile/>,
    icon: <BsPerson size={32}/>
  }
}

export const navConfig = {
  routes
}