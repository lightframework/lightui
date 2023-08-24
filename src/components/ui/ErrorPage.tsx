import { Typography } from 'antd';

export default function ErrorPage({ children }: { children: React.ReactNode }) {
  return (
    <Typography.Title level={3} type="secondary" className="mt-40 text-center">
      {children}
    </Typography.Title>
  );
}
