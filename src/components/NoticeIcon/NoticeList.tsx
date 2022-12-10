import { Avatar, List } from 'antd';
import classNames from 'classnames';
import React from 'react';

import {createUseStyles}  from 'react-jss'

 
const useStyle = createUseStyles({
  notFound: {
  },
  list: {
  },
  meta: {
  },
  read: {
  },
  item: {
  },
  avatar: {
  },
  iconElement: {
  },
  extra: {
  },
  title: {
  },
  description: {
  },
  datetime: {
  },
  bottomBar:{}
})

export type NoticeIconTabProps = {
  count?: number;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title: string;
  tabKey: API.NoticeIconItemType;
  onClick?: (item: API.NoticeIconItem) => void;
  onClear?: () => void;
  emptyText?: string;
  clearText?: string;
  viewMoreText?: string;
  list: API.NoticeIconItem[];
  onViewMore?: (e: any) => void;
};
const NoticeList: React.FC<NoticeIconTabProps> = ({
  list = [],
  onClick,
  onClear,
  title,
  onViewMore,
  emptyText,
  showClear = true,
  clearText,
  viewMoreText,
  showViewMore = false,
}) => {

  const classes = useStyle()

  if (!list || list.length === 0) {
    return (
      <div className={classes.notFound}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          alt="not found"
        />
        <div>{emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List<API.NoticeIconItem>
        className={classes.list}
        dataSource={list}
        renderItem={(item, i) => {
          const itemCls = classNames(classes.item, {
            [classes.read]: item.read,
          });
          // eslint-disable-next-line no-nested-ternary
          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={classes.avatar} src={item.avatar} />
            ) : (
              <span className={classes.iconElement}>{item.avatar}</span>
            )
          ) : null;

          return (
            <div
              onClick={() => {
                onClick?.(item);
              }}
            >
              <List.Item className={itemCls} key={item.key || i}>
                <List.Item.Meta
                  className={classes.meta}
                  avatar={leftIcon}
                  title={
                    <div className={classes.title}>
                      {item.title}
                      <div className={classes.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={classes.description}>{item.description}</div>
                      <div className={classes.datetime}>{item.datetime}</div>
                    </div>
                  }
                />
              </List.Item>
            </div>
          );
        }}
      />
      <div className={classes.bottomBar}>
        {showClear ? (
          <div onClick={onClear}>
            {clearText} {title}
          </div>
        ) : null}
        {showViewMore ? (
          <div
            onClick={(e) => {
              if (onViewMore) {
                onViewMore(e);
              }
            }}
          >
            {viewMoreText}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NoticeList;
