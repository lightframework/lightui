import clsx from 'clsx';
import React from 'react';

export default function PageContainer({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={clsx('overflow-y-auto', className)}>{children}</div>;
}
