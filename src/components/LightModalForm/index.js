import { Form, Modal } from 'antd';
import './index.less';

const { Item } = Form;

const APP = (props) => {
  const _columns = props.columns;
  const _children = props.children;
  const _open = props.open;
  const _onOpenChange = props.onOpenChange;
  const _onCancel = props.onCancel;
  const _key = props.key;

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
      <Modal open={_open} onCancel={_onCancel} closable={false}>
        <Form>
          {columnRender()}
          {_children}
        </Form>
      </Modal>
    </div>
  );
};

export default APP;
