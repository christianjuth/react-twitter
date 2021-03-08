import { FaTwitter } from 'react-icons/fa'
import styled from 'styled-components'
import { theme, auth } from '../utils'
import { ReactChildren } from '../types'
import { Display } from '../components/Grid'
import { Link } from '../components/Link'
import { Text } from '../components/Text'
import { useLocation } from 'react-router-dom'
import { BiLogOut } from'react-icons/bi'

import { navConfig } from './config'

const FlexCol = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(5, 2)};
  font-size: 1rem;
`

const ItemWrap = styled(Link)<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  * {
    color: ${({active}) => active ? theme.color('accent1') : theme.color('text')};
  }
  padding-top: ${theme.spacing(4)};
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
      {icon}
      <Display xs={false} md={true}>
        <Text 
          variant='h5' 
          noPadding
          style={{
            padding: theme.spacing(0, 3)
          }}
        >
          {title}
        </Text>
      </Display>
    </ItemWrap>
  )
}

export function Sidebar() {
  const location = useLocation()

  return (
    <FlexCol>
      <Link href="/" style={{color: theme.color('text')}}>
        <FaTwitter size={32}/>
      </Link>
      {Object.entries(navConfig.routes).map(([key, config]) => config.icon ? (
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