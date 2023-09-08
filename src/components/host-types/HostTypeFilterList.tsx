import { useHostTypeOptions } from '@/hooks/options';
import { RightOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from '@umijs/max';
import { Radio } from 'antd';
import { useEffect, useState } from 'react';

export default function HostTypeFilterList({
  onChange,
}: {
  onChange?: VoidFunction;
}) {
  const hostTypeOptions = useHostTypeOptions();

  const [hostType, setHostType] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const item = hostTypeOptions.options.find(
      (item) => item.HostType === searchParams.get('type'),
    );

    if (item) {
      setHostType(item.HostType);
    } else if (hostType !== 'all') {
      setHostType('all');
      navigate('?type=all', { replace: true });
    }
  }, [hostTypeOptions]);

  return (
    <div className="flex items-center space-x-2">
      <span className="shrink-0">主机类型：</span>

      {hostTypeOptions.options.length === 0 ? (
        <Link to="/cmdb/host-types">
          暂无主机类型，是否添加？
          <RightOutlined />
        </Link>
      ) : (
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
              navigate('?type=all', { replace: true });
            }}
          >
            全部
          </Radio.Button>
          {hostTypeOptions.options.map((item) => (
            <Radio.Button
              key={item.Uid}
              value={item.HostType}
              onClick={() => {
                navigate(`?type=${item.HostType}`, { replace: true });
              }}
            >
              {item.HostType}
            </Radio.Button>
          ))}
        </Radio.Group>
      )}
    </div>
  );
}
