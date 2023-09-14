import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    localStorage.setItem('isInitial', 'true');
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          fontSize: 12,
          colorPrimary: '#7b4df9',
          colorLink: '#7b4df9',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConfigProvider>
  );
}
