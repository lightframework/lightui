import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { history } from '@umijs/max';
import { ConfigProvider, theme } from 'antd';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

export default function RootContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (location.pathname === '/') {
      const path = localStorage.getItem('path');
      if (path) {
        history.push(path);
      }
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
        token: {
          borderRadius: 4,
          // fontSize: 12,
        },
        components: {
          // Result: {
          //   titleFontSize: 14,
          // },
          List: {
            itemPaddingSM: '0',
            itemPadding: '0',
            itemPaddingLG: '0',
          },
          Select: {
            multipleItemBg: theme.getDesignToken().colorPrimaryBg,
            multipleItemBorderColor: theme.getDesignToken().colorPrimary,
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConfigProvider>
  );
}
