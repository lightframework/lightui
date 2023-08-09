import { Radio } from 'antd';
import { useState } from 'react';

export default function HostTypeFilterList({
  items,
  onChange,
}: {
  items: API.HostTypeOption[];
  onChange?: VoidFunction;
}) {
  const [hostType, setHostType] = useState('');

  return (
    <Radio.Group
      className="p-2"
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
  );
}
