import React, { useEffect, useState } from "react"
// @ts-ignore
import { Dots } from "react-activity"
import "react-activity/dist/react-activity.css"
import { ReactChildren } from "../types"
import { FlexGrid } from "./Grid"
import { Layout } from './Layout'

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

interface ActivityIndicatorLayoutProps extends ActivityIndicatorProps {
  style?: React.CSSProperties
}

export function ActivityIndicatorLayout({
  style,
  ...rest
}: ActivityIndicatorLayoutProps) {
  return (
    <Layout>
      <FlexGrid.Row
        style={{
          flex: 1,
          minHeight: '100%',
          justifyContent: "center",
          alignItems: "center",
          ...style,
        }}
      >
        <ActivityIndicator {...rest} />
      </FlexGrid.Row>
    </Layout>
  )
}