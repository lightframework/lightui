import { useLocation, useNavigate } from '@umijs/max';
import { Radio, message } from 'antd';
import { useEffect, useState } from 'react';

export default function HostTypeFilterList({
  items,
  onChange,
}: {
  items: API.HostTypeOption[];
  onChange?: VoidFunction;
}) {
  const [hostType, setHostType] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const item = items.find(
      (item) => item.HostTypeName === searchParams.get('type'),
    );

    if (item) {
      setHostType(item.HostTypeName);
    } else {
      setHostType('all');
      navigate('?type=all', { replace: true });
    }
  }, [items]);

  return (
    <div className="flex items-center space-x-2">
      <span className="shrink-0">分类：</span>
      <Radio.Group
        value={hostType}
        onChange={(e) => {
          setHostType(e.target.value);
          onChange?.();
        }}
      >
        <Radio.Button
          key="all"
          value="all"
          onClick={() => {
            message.info('暂未实现');
            navigate('?type=all', { replace: true });
          }}
        >
          全部
        </Radio.Button>
        {items.map((item) => (
          <Radio.Button
            key={item.Uid}
            value={item.HostTypeName}
            onClick={() => {
              message.info('暂未实现');
              navigate(`?type=${item.HostTypeName}`, { replace: true });
            }}
          >
            {item.HostTypeName}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}
