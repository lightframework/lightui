import { Button, Modal } from 'antd';

export default function JsonDisplayModal({
  title,
  content,
  open,
  onCancel,
}: {
  title: string;
  content?: any;
  open: boolean;
  onCancel: VoidFunction;
}) {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="back" type="default" onClick={onCancel}>
          返回
        </Button>,
      ]}
    >
      <pre className="mt-10 max-h-[600px] overflow-y-auto">
        {JSON.stringify(content, null, 2)}
      </pre>
    </Modal>
  );
}
