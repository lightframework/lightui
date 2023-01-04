import React from 'react';
import { createUseStyles } from 'react-jss';
import { Card, Input, List } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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

export type BaseListProps = {
  title: string;
};

const BaseList: React.FC<BaseListProps> = ({ title }) => {
  const classes = useStyle();
  // const [data, setData] = useState([
  //   'Racing car sprays burning fuel into crowd.',
  //   'Japanese princess to wed commoner.',
  //   'Australian walks 100km after outback crash.',
  //   'Man charged over missing wedding girl.',
  //   'Los Angeles battles huge wildfires.',
  // ]);

  const data = [
    'what',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  return (
    <div className={classes.container}>
      <Card style={{ height: '100%' }}>
        <div className={classes.text}>
          <h3>{title}</h3>
          <Input prefix={<SearchOutlined />} className={classes.search} />
          <List
            size="small"
            className={classes.list}
            dataSource={data}
            renderItem={(item) => <List.Item className={classes.listItem}>{item}</List.Item>}
          />
        </div>
      </Card>
    </div>
  );
};

export default BaseList;
