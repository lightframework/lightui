import Convert from 'ansi-to-html';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

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
  const [isJSON, setIsJSON] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      const json = JSON.parse(content);
      setIsJSON(true);
      setText(json);
    } catch (error) {
      const convert = new Convert();
      setText(convert.toHtml(String(content)));
    }
  }, [content]);

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
      {isJSON ? (
        <pre className="mt-10 max-h-[600px] overflow-y-auto">
          {JSON.stringify(text, null, 2)}
        </pre>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: text.replaceAll('\n', '<br />') }}
        ></div>
      )}
    </Modal>
  );
}
