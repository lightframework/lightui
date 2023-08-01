import BaseList from '@/components/bases/BaseList';
import { useLightState } from '@/components/hooks';
import { LeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { Resizable } from 'react-resizable';
import styles from './index.less';

const useStyle = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },
  leftBox: {
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
  transition: {
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
  code?: number;
  msg?: string;
};

export interface LeftTreeProps {
  listRequest?: () => Promise<PageDataType<object>>;
  children?: React.ReactElement;
  value?: any;
  onChange?: (v: any) => void;
  onClick?: (v: any) => void;
  widthKey?: string;
  title?: React.ReactElement;
}

const Page: React.FC<LeftTreeProps> = ({ children, listRequest, widthKey }) => {
  const classes = useStyle();
  const [fold, setFold] = useState<boolean>(false);
  const [leftWidth, setLeftWidth] = useLightState<string>(widthKey || 'leftSiderWidth', '200');
  const boxRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState<number>();

  const data = [
    {
      label: '33',
      value: 'sdld',
    },
    {
      label: '555',
      value: 'sdld',
    },
    {
      label: '8888',
      value: 'sdld',
    },
  ];

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      // 当宽度发生变化时，entries[0].contentRect.width 表示新的宽度值
      const newWidth = entries[0].contentRect.width;
      setBoxWidth(newWidth);
      // 在这里可以进行你的处理，比如更新状态或执行其他操作
    });

    // 监听 divRef 引用的 DOM 元素的宽度变化
    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }

    // 在组件卸载时取消监听
    return () => {
      if (boxRef.current) {
        resizeObserver.unobserve(boxRef.current);
      }
    };
  }, []);

  return (
    <PageContainer>
      <div
        className={classNames(classes.container, classes.transition)}
        style={{ display: 'flex' }}
        ref={boxRef}
      >
        {!fold && (
          <Resizable
            width={Number(leftWidth)}
            height={0}
            onResize={(e, { size }) => {
              setLeftWidth(String(size.width));
            }}
            className={styles.resizeBox}
            axis="x"
            handleSize={[10, 10]}
            resizeHandles={['e']}
            handle={<span className={styles.leftSider} />}
          >
            <div style={{ width: Number(leftWidth) }}>
              <BaseList title="团队列表" data={data} />
            </div>
          </Resizable>
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
              style={{ transform: fold ? 'rotate(180deg)' : undefined }}
            />
          </div>
        </div>
        <div
          style={{
            width: !!boxWidth && !fold ? boxWidth - Number(leftWidth) - 14 : '100%',
          }}
        >
          {children}
        </div>
      </div>
    </PageContainer>
  );
};

export default Page;
