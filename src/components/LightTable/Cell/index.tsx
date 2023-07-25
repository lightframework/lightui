import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { BlueColor } from '@/constants';
import { message } from 'antd';
import _ from 'lodash';

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
  index,
  copyAble,
  children,
  ...restProps
}) => {
  const [copied, setCopied] = useState(false);

  const value = _.get(record, dataIndex);
  const hasData = () => {
    if (!value) {
      return false;
    } else if (typeof value == 'string') {
      if (value.length == 0) {
        return false;
      } else {
        return true;
      }
    } else if (typeof value == 'number') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <td {...restProps}>
      {children}
      <span style={{ marginLeft: 5, display: hasData() ? undefined : 'none' }}>
        {!!copyAble && !copied && (
          <CopyOutlined
            style={{ color: BlueColor }}
            onClick={() => {
              navigator.clipboard
                .writeText(value)
                .then(() => {
                  message.success('复制成功');
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1500);
                })
                .catch((error) => {
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
        {!!copyAble && copied && <CheckOutlined style={{ color: BlueColor }} />}
      </span>
    </td>
  );
};

export default LightTableCell;
