import { message, Table } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import QueryHeader from '../QueryHeader';
import Cell from './Cell';
import './index.less';

const InternalTable = (props) => {
  const _params = props.params;
  const _request = props.request;
  const _columns = props.columns;
  const _defaultPageSize = props.defaultPageSize;
  const _dataSource = props.dataSource;
  const _pagination = props.pagination;
  const _queryColumns = props.queryColumns;
  const _buttonRender = props.buttonRender;
  const _serch = props.search;
  const _ref = props._ref;

  let queryColumns = [];

  const [total, setTotal] = useState(0);
  const [ds, setDS] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({});
  const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: _defaultPageSize || 10 });

  const getData = () => {
    if (!_request) {
      return;
    }

    setLoading(true);
    _request?.({ ...query, ...pageInfo }).then((d) => {
      if (d.resp.success) {
        setTotal(d?.data?.total || 0);
        setDS(d?.data?.list);
        setLoading(false);
      } else {
        message.error(d.resp.string);
        setDS([]);
        setLoading(false);
      }
    });
  };

  useImperativeHandle(
    _ref,
    () => {
      return {
        reload: (resetPageIndex) => {
          if (resetPageIndex) {
            setQuery({ ...query, current: 1 });
            return;
          }
          setQuery({ ...query });
        },
        pageInfo: {
          current: query.current,
          pageSize: query.pageSize,
          total,
        },
      };
    },
    [],
  );

  if (!!_queryColumns) {
    queryColumns = _queryColumns;
  } else {
    _columns?.forEach((c) => {
      if (!!c.search) {
        queryColumns.push({
          ...c.search,
          name: c.dataIndex,
          label: c.title,
        });
      }
    });
  }
  const mergedColumns = _columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        copyAble: col.copyAble,
      }),
    };
  });

  useEffect(() => {
    getData();
  }, [query, pageInfo]);

  return (
    <div className="table-wrapper">
      {!!_serch && (
        <QueryHeader
          columns={queryColumns}
          buttonRender={_buttonRender}
          onFinish={(values) => {
            setQuery({ ...query, ...values, current: 1 });
          }}
        />
      )}

      <Table
        loading={loading}
        columns={mergedColumns}
        components={{
          body: {
            cell: Cell,
          },
        }}
        rowClassName="table-row"
        pagination={{
          total: total,
          onChange: (p, ps) => {
            setPageInfo({ current: p, pageSize: ps });
          },
          showTotal: (t) => {
            return <>共 {t} 条</>;
          },
          defaultPageSize: _defaultPageSize || 10,
          ..._pagination,
        }}
        dataSource={ds}
      />
    </div>
  );
};

function LightTable(props, ref) {
  return React.createElement(
    InternalTable,
    Object.assign({}, props, {
      _ref: ref,
    }),
  );
}

export default forwardRef(LightTable);
