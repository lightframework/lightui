import { Button } from 'antd';

export default function DisabledUpdateButton({
  label = '编辑',
}: {
  label?: string;
}) {
  return (
    <Button type="link" disabled>
      {label}
    </Button>
  );
}
