import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

const unsecuredCopyToClipboard = (text: string) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
};

const copyToClipboard = async (text: string) => {
  if (window.isSecureContext && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    unsecuredCopyToClipboard(text);
  }
};

export default function CopyableText({
  text,
  copyText,
}: {
  text: string;
  copyText?: string;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) {
      setTimeout(() => setDone(false), 2500);
    }
  }, [done]);

  const copy = async () => {
    await copyToClipboard(copyText ?? text);
    setDone(true);
  };

  return (
    <div className="flex items-center">
      {text}
      <Button
        size="small"
        type="link"
        className="ml-1 !w-auto"
        icon={done ? <CheckOutlined /> : <CopyOutlined />}
        onClick={done ? undefined : copy}
      />
    </div>
  );
}
