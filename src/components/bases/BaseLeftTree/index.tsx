import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { createUseStyles } from 'react-jss';
import { LeftOutlined } from '@ant-design/icons';
import Table from '@/components/bases/BaseTable';
import BaseList from '@/components/bases/BaseList';

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

const Page: React.FC = () => {
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
        <div className={classes.rightBox}>
          <Table />
        </div>
      </div>
    </PageContainer>
  );
};

export default Page;
