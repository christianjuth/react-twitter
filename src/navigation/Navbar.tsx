import styled from 'styled-components'
import { Text } from '../components/Text'
import { Divider } from '../components/Divider'
import { theme } from '../utils'

const Bar = styled.div`
  padding: ${theme.spacing(2)};
`

export function Navbar({
  title
}: {
  title?: string
}) {
  return (
    <>
      <Bar>
        <Text variant='h5' noPadding>{title}</Text>
      </Bar>
      <Divider noPadding/>
    </>
  )
}