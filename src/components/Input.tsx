import styled from 'styled-components'
import { theme } from '../utils'
import { GenericProps } from '../types'

const InputStyled = styled.input<{ inputSize: GenericProps.Size }>`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.color('divider')};
  font-size: 2rem;

  ${({inputSize}) => {
    switch (inputSize) {
      case 'sm':
        return 'font-size: 1rem;'
      case 'lg':
        return 'font-size: 1.5rem;'
      default:
        return 'font-size: 2rem;'
    }
  }}
`

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: GenericProps.Size
}

export function Input({
  size = 'md',
  ...rest
}: InputProps) {
  return <InputStyled inputSize={size} {...rest} />
}