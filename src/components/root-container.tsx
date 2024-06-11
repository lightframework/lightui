import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { history } from "@umijs/max"
import { App, ConfigProvider, theme } from "antd"
import { useEffect } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

export default function RootContainer({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (location.pathname === "/") {
      const path = localStorage.getItem("path")
      if (path) {
        history.push(path)
      }
    }
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.compactAlgorithm],
        token: {
          borderRadius: 4,
          colorPrimary: "#3f56e2",
          colorLink: "#3f56e2",
        },
        components: {
          List: {
            itemPaddingSM: "0",
            itemPadding: "0",
            itemPaddingLG: "0",
          },
          Select: {
            multipleItemBg: "#f0f4ff",
            multipleItemBorderColor: "#3f56e2",
          },
          Segmented: {
            itemSelectedBg: "#ebeefd",
            itemSelectedColor: "#3a57e8",
            colorBgLayout: "white",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App>{children}</App>
      </QueryClientProvider>
    </ConfigProvider>
  )
}
