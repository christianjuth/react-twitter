import styled from 'styled-components'
import { Text } from '../components/Text'
import { theme } from '../utils'

const Bar = styled.div`
  padding: ${theme.spacing(2)};
  position: sticky;
  top: 0;
  background-color: ${theme.color('primary')};
  border-bottom: 1px solid ${theme.color('divider')};
`

export function Navbar({
  title
}: {
  title?: string
}) {
  return (
    <Bar>
      <Text variant='h5' noPadding>{title}</Text>
    </Bar>
  )
}