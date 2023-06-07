import { Form, Modal } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';

const { Item } = Form;

const APP = (props) => {
  const _columns = props.columns;
  const _children = props.children;
  const _open = props.open;
  const _onOpenChange = props.onOpenChange;
  const _onCancel = props.onCancel;
  const _key = props.key;
  const _title = props.title;
  const _onSuccess = props.onSuccess;
  const _onFailed = props.onFailed;
  const _messageRender = props.messageRender;
  const _width = props.width;
  const _successMsg = props.successMsg;
  const _failedMsg = props.failedMsg;
  const _okText = props.okText;
  const _request = props.request;

  const _form = props.form;
  const [formInstance] = Form.useForm(_form);
  const [loading, setLoading] = useState();

  useEffect(() => {}, []);

  const columnRender = () => {
    if (!_columns) {
      return;
    }
    return _columns.map(({ itemChildren, ...restProps }) => {
      return (
        <Item {...restProps} key={_key}>
          {itemChildren}
        </Item>
      );
    });
  };

  return (
    <div className="table-wrapper">
      <Modal
        open={_open}
        onCancel={_onCancel}
        closable={false}
        title={_title}
        width={_width}
        onOk={() => {
          formInstance.submit();
        }}
        okButtonProps={{
          loading: loading,
        }}
      >
        <Form
          form={formInstance}
          onFinish={(values) => {
            setLoading(true);
            _request?.(values)
              .then((dt) => {
                if (dt?.resp?.success) {
                  console.log(dt);
                  _onSuccess?.(dt);
                  _messageRender?.(dt);
                  !_messageRender && message.success(_successMsg);
                } else {
                  _onFailed?.(null);
                  _messageRender?.(dt);
                  !_messageRender && message.error(_failedMsg);
                }
              })
              .catch((e) => {
                _onFailed?.(e);
                _messageRender?.();
                !_messageRender && message.error(_failedMsg);
              });
            setLoading(false);
          }}
        >
          {columnRender()}
          {_children}
        </Form>
      </Modal>
    </div>
  );
};

export default APP;
