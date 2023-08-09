import { Radio } from 'antd';
import { useState } from 'react';

export default function HostTypeFilterList({
  title,
  items,
  onChange,
}: {
  title?: string;
  items: API.HostTypeOption[];
  onChange?: VoidFunction;
}) {
  const [hostType, setHostType] = useState('');

  return (
    <div className="flex items-center gap-2">
      {title && <span className="text-base font-semibold">{title}</span>}
      <Radio.Group
        value={hostType}
        onChange={(e) => {
          setHostType(e.target.value);
          onChange?.();
        }}
      >
        <Radio.Button key="all" value="">
          全部
        </Radio.Button>
        {items.map((item) => (
          <Radio.Button key={item.Uid} value={item.Uid}>
            {item.HostTypeName}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}
