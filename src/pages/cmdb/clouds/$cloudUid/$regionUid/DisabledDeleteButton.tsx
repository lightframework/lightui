import { Button } from 'antd';

export default function DisabledDeleteButton({
  label = '删除',
}: {
  label?: string;
}) {
  return (
    <Button type="link" disabled>
      {label}
    </Button>
  );
}
