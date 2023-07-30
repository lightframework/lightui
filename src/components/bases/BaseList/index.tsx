import { SearchOutlined } from '@ant-design/icons';
import { Card, Input, List } from 'antd';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },
  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  search: {
    width: '100%',
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(24, 144, 255, .5)',
    },
  },
});

export type ListItem = {
  label: string;
  value: any;
};

export type LightListData = ListItem[];

export type BaseListProps = {
  title?: string;
  data?: LightListData;
  onChange?: (v: any) => void;
  onClick?: (v: any) => void;
  width?: number;
};

const BaseList: React.FC<BaseListProps> = ({ title, data }) => {
  const classes = useStyle();
  const [current, setCurrent] = useState();
  // const [data, setData] = useState([
  //   'Racing car sprays burning fuel into crowd.',
  //   'Japanese princess to wed commoner.',
  //   'Australian walks 100km after outback crash.',
  //   'Man charged over missing wedding girl.',
  //   'Los Angeles battles huge wildfires.',
  // ]);

  return (
    <div className={classes.container}>
      <Card style={{ height: '100%', width: '100%' }}>
        <div className={classes.text}>
          <h3>{title}</h3>
          <Input prefix={<SearchOutlined />} className={classes.search} />
          <List
            size="small"
            className={classes.list}
            dataSource={data}
            renderItem={(item) => (
              <List.Item className={classes.listItem} onClick={() => {}}>
                {item.label}
              </List.Item>
            )}
          />
        </div>
      </Card>
    </div>
  );
};

export default BaseList;
