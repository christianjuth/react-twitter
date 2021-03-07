import { FaTwitter } from 'react-icons/fa'
import styled from 'styled-components'
import { theme, auth } from '../utils'
import { ReactChildren } from '../types'
import { Text, Link } from '../components'
import { useLocation } from 'react-router-dom'
import { BiLogOut } from'react-icons/bi'

import { navConfig } from './config'

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${theme.spacing(5)};
  font-size: 1rem;
  flex: 1;
  height: 100%;
`

const ItemWrap = styled(Link)<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  * {
    color: ${({active}) => active ? theme.color('accent1') : theme.color('text')};
  }
  padding-top: ${theme.spacing(5)};
`

const IconWrap = styled.div`
  padding-right: ${theme.spacing(2)};
`

function Item({
  icon,
  title,
  active = false,
  href,
  onClick
}: {
  icon: ReactChildren
  title: string
  active?: boolean
  href?: string
  onClick?: () => any
}) {
  return (
    <ItemWrap active={active} href={href} onClick={onClick}>
      <IconWrap>
        {icon}
      </IconWrap>
      <Text variant='h5' noPadding>{title}</Text>
    </ItemWrap>
  )
}

export function Sidebar() {
  const location = useLocation()

  return (
    <FlexCol>
      <Link href="/">
        <FaTwitter size={32}/>
      </Link>
      {Object.entries(navConfig.routes).map(([key, config]) => config.showInSidebar ? (
        <Item
          key={key}
          href={key}
          active={location.pathname === key}
          icon={config.icon}
          title={config.title}
        />
      ) : null)}

      <Item
        icon={<BiLogOut size={32}/>}
        title='Logout'
        onClick={auth.logout}
      />
    </FlexCol>
  )
}