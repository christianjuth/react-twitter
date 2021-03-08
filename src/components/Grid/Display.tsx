import { computeBreakpoints } from "./utils"
import * as Styles from "./styles"
import { DisplayProps } from "./types"

export function Display({ children, className, style, ...rest }: DisplayProps) {
  const computedBreakPoints = computeBreakpoints(rest)
  return (
    <Styles.Display
      computedBreakpoints={computedBreakPoints}
      className={className}
      style={style}
    >
      {children}
    </Styles.Display>
  )
}
