import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';
import _ from 'lodash';
import { useState } from 'react';

function unsecuredCopyToClipboard(text: string) {
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
}

async function copyToClipboard(content: string) {
  if (window.isSecureContext && navigator.clipboard) {
    await navigator.clipboard.writeText(content);
  } else {
    unsecuredCopyToClipboard(content);
  }
}

interface LightTableCellProps extends React.HTMLAttributes<HTMLElement> {
  dataIndex: string;
  record: any;
  index: number;
  copyAble: boolean;
  children: React.ReactNode;
}

const LightTableCell: React.FC<LightTableCellProps> = ({
  dataIndex,
  record,
  copyAble,
  children,
  ...restProps
}) => {
  const [copied, setCopied] = useState(false);

  const value = _.get(record, dataIndex);
  const hasData = () => {
    if (!value) {
      return false;
    } else if (typeof value === 'string') {
      if (value.length === 0) {
        return false;
      } else {
        return true;
      }
    } else if (typeof value === 'number') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <td {...restProps}>
      {value === '' || undefined || null ? '-' : children}
      <span style={{ marginLeft: 5, display: hasData() ? undefined : 'none' }}>
        {!!copyAble && !copied && (
          <CopyOutlined
            className="text-lightwan-blue"
            onClick={() => {
              copyToClipboard(value)
                .then(() => {
                  message.success('复制成功');
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1500);
                })
                .catch(() => {
                  const textarea = document.createElement('textarea');
                  textarea.value = value;
                  document.body.appendChild(textarea);
                  textarea.select();
                  document.execCommand('copy');
                  document.body.removeChild(textarea);
                });
            }}
          />
        )}
        {!!copyAble && copied && (
          <CheckOutlined className="text-lightwan-blue" />
        )}
      </span>
    </td>
  );
};

export default LightTableCell;
