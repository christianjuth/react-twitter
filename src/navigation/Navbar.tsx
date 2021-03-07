import styled from 'styled-components'
import { Text } from '../components/Text'
import { theme } from '../utils'
import { Helmet } from 'react-helmet-async'

const Bar = styled.div`
  padding: ${theme.spacing(2)};
  position: sticky;
  top: 0;
  background-color: ${theme.color('primary')};
  border-bottom: 1px solid ${theme.color('divider')};
`

function formatTitle(title?: string) {
  return ['Twitter', title].filter(Boolean).join(' | ')
}

export function Navbar({
  title
}: {
  title?: string
}) {
  return (
    <>
      <Helmet>
        <title>{formatTitle(title)}</title>
      </Helmet>
      <Bar>
        <Text variant='h5' noPadding>{title}</Text>
      </Bar>
    </>
  )
}