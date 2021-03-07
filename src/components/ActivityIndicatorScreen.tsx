import React, { useState, useEffect } from "react"
// @ts-ignore
import { Dots } from "react-activity"
import { FlexGrid } from "./Grid"
import { ReactChildren } from "../types"
import "react-activity/dist/react-activity.css"
import { theme } from "../utils"

interface ActivityIndicatorProps {
  delay?: number
  children?: ReactChildren<string>
}

function ActivityIndicator({ delay = 500, children }: ActivityIndicatorProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let id = setTimeout(() => {
      setVisible(true)
    }, delay)
    return () => clearTimeout(id)
  }, [delay])

  if (!visible) {
    return null
  }

  return children ? <>{children}</> : <Dots />
}

interface ActivityIndicatorScreenProps extends ActivityIndicatorProps {
  style?: React.CSSProperties
}

export function ActivityIndicatorScreen({
  style,
  ...rest
}: ActivityIndicatorScreenProps) {
  return (
    <FlexGrid.Row
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.color("primary"),
        zIndex: theme.zIndex("header", -1),
        ...style,
      }}
    >
      <ActivityIndicator {...rest} />
    </FlexGrid.Row>
  )
}