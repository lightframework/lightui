import { message, Table } from 'antd';
import { useEffect, useState } from 'react';
import QueryHeader from '../QueryHeader';
import './index.less';

const APP = (props) => {
  const _actionRef = props.actionRef;
  const _params = props.params;
  const _request = props.request;
  const _columns = props.columns;
  const _defaultPageSize = props.defaultPageSize;
  const _dataSource = props.dataSource;
  const _pagination = props.pagination;
  const _queryColumns = props.queryColumns;
  const _buttonRender = props.buttonRender;
  const _serch = props.search;

  let queryColumns = [];

  const [total, setTotal] = useState(0);
  const [ds, setDS] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({ current: 1, pageSize: _defaultPageSize || 10 });

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

  useEffect(() => {
    if (!_request) {
      return;
    }
    setLoading(true);
    _request?.({ ...query }).then((d) => {
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
  }, [query]);

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
        columns={_columns}
        rowClassName="table-row"
        pagination={{
          total: total,
          current: query.current,
          onChange: (p, ps) => {
            setQuery({ ...query, current: p, pageSize: ps });
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

export default APP;
