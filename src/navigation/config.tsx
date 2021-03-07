import { GiBirdHouse } from 'react-icons/gi'
import { BsPerson } from 'react-icons/bs'
import { FaHashtag } from 'react-icons/fa'
import * as Pages from '../pages'
import { urls } from '../utils'

const routes: Record<string, {
  title: string
  component: JSX.Element
  icon?: JSX.Element
}> = {
  [urls.routes.home()]: {
    title: 'Home',
    component: <Pages.Home/>,
    icon: <GiBirdHouse size={32}/>
  },
  [urls.routes.tweet(':tweetId')]: {
    title: 'Tweet',
    component: <Pages.Tweet/>,
  },
  [urls.routes.explore()]: {
    title: 'Explore',
    component: <Pages.Explore/>,
    icon: <FaHashtag size={32}/>
  },
  [urls.routes.profile()]: {
    title: 'Profile',
    component: <Pages.Profile/>,
    icon: <BsPerson size={32}/>
  },
  [urls.routes.profile(':handle')]: {
    title: 'Profile',
    component: <Pages.Profile/>
  }
}

export const navConfig = {
  routes
}