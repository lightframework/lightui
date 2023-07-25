import BaseList from '@/components/bases/BaseList';
import { LeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },
  leftBox: {
    width: 'auto',
    backgroundColor: '#fff',
  },
  centerBox: {
    margin: 'auto 0',
  },
  iconFix: {
    height: 60,
    backgroundColor: 'rgba(217,217,217, .8)',
    borderRadius: 10,
    display: 'table-cell',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
  icon: {
    color: 'rgba(5,5,5, .5)',
  },
  rightBox: {
    transition: 'all 1s',
  },
});

type BaseResp = {
  code?: number;
  msg?: string;
  success: boolean;
};

export type PageDataType<T> = {
  data: {
    list: T[];
    total: number;
  };
  resp: BaseResp;
};

export interface LeftTreeProps {
  listRequest?: () => Promise<PageDataType<object>>;
  children?: React.ReactElement;
  value?: any;
  onChange?: (v: any) => void;
}

const Page: React.FC<LeftTreeProps> = ({ children, listRequest }) => {
  const classes = useStyle();
  const [fold, setFold] = useState<boolean>(false);

  return (
    <PageContainer>
      <div className={classes.container}>
        {!fold && (
          <div className={classes.leftBox}>
            <BaseList title="团队列表" />
          </div>
        )}
        <div className={classes.centerBox}>
          <div
            className={classes.iconFix}
            onClick={() => {
              setFold(!fold);
            }}
          >
            <LeftOutlined
              className={classes.icon}
              style={{ transform: !fold ? 'rotate(180deg)' : undefined }}
            />
          </div>
        </div>
        <div className={classes.rightBox}>{children}</div>
      </div>
    </PageContainer>
  );
};

export default Page;
