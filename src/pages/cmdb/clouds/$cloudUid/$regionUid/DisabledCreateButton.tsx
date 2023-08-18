import { Button } from 'antd';

export default function DisabledCreateButton({
  label = '新增',
}: {
  label?: string;
}) {
  return (
    <Button type="primary" disabled>
      {label}
    </Button>
  );
}
