import clsx from 'clsx';
import React from 'react';

export default function PageContainer({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        'shadow-base h-full overflow-y-auto bg-white p-3',
        className,
      )}
    >
      {children}
    </div>
  );
}
