import { ConfigProvider } from 'antd';
import { useEffect } from 'react';

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
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
