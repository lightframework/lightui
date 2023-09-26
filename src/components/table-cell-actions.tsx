import { Button } from 'antd';

export default function TableCellActions({
  actions,
}: {
  actions: {
    text: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    danger?: boolean;
    disabled?: boolean;
  }[];
}) {
  return (
    <div className="flex gap-1">
      {actions.map((action) => (
        <Button
          key={action.text}
          type="link"
          size="small"
          disabled={action.disabled}
          danger={action.danger}
          onClick={action.onClick}
        >
          {action.text}
        </Button>
      ))}
    </div>
  );
}
