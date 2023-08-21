import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button } from 'antd';
import clsx from 'clsx';
import { ComponentProps, ReactNode, useState } from 'react';

export default function CollapseDescriptions({
  title,
  toolBarRender,
  defaultShow = false,
  ...props
}: Omit<
  ComponentProps<typeof ProDescriptions>,
  'title' | 'className' | 'extra'
> & {
  title?: string;
  toolBarRender?: ReactNode;
  defaultShow?: boolean;
}) {
  const [show, setShow] = useState(defaultShow);

  return (
    <ProDescriptions
      {...props}
      title={
        <div className="flex items-center gap-x-2">
          <span>{title}</span>
          {toolBarRender ? (
            <div className="translate-y-0.5">{toolBarRender}</div>
          ) : null}
        </div>
      }
      className={clsx('bg-[#fafafa] p-3', show && 'space-y-3')}
      extra={
        <Button
          shape="circle"
          type="text"
          icon={show ? <UpOutlined /> : <DownOutlined />}
          onClick={() => setShow((prev) => !prev)}
        />
      }
      items={show ? props.items : undefined}
    />
  );
}
