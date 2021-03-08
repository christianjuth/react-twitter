import { BiLogOut } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Display } from '../components/Grid'
import { Link } from '../components/Link'
import { ReactChildren } from '../types'
import { theme, auth } from '../utils'
import { navConfig } from './config'


const HEIGHT = 63

const Spacer = styled.div`
  /* Subtracting 1 prevents double divider */
  min-height: ${HEIGHT-1}px;
  height: ${HEIGHT-1}px;
`

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  min-height: ${HEIGHT}px;
  border-top: 1px solid ${theme.color('divider')};
  background-color: ${theme.color('primary')};
  z-index: ${theme.zIndex('header', -1)};
  padding: ${theme.spacing(0, 3)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ItemWrap = styled(Link)<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  * {
    color: ${({active}) => active ? theme.color('accent1') : theme.color('text')};
  }
`

function Item({
  icon,
  active = false,
  href,
  onClick
}: {
  icon: ReactChildren
  active?: boolean
  href?: string
  onClick?: () => any
}) {
  return (
    <ItemWrap active={active} href={href} onClick={onClick}>
      {icon}
    </ItemWrap>
  )
}

export function AppBar() {
  const location = useLocation()

  return (
    <Display xs={true} md={false}>
      <Bar>
        {Object.entries(navConfig.routes).map(([key, config]) => config.icon ? (
          <Item 
            key={key}
            href={key}
            icon={config.icon}
            active={location.pathname === key}
          />
        ) : null)}
        <Item 
          icon={<BiLogOut size={32}/>} 
          onClick={auth.logout}
        />
      </Bar>
    </Display>
  )
}

AppBar.Spacer = () => (
  <Display xs={true} md={false}>
    <Spacer/>
  </Display>
)