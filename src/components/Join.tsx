import * as React from "react"
import { ReactChild } from "../types"

export function Join({
  children,
  separator,
}: {
  children: ReactChild<string>[]
  separator: ReactChild<string>
}) {
  const output: ReactChild[] = []

  let i = 0
  for (const child of React.Children.toArray(children)) {
    if (i > 0) {
      output.push(
        <React.Fragment key={`separator-${i}`}>{separator}</React.Fragment>
      )
    }
    output.push(child)
    i++
  }

  return <>{output}</>
}

export default Join