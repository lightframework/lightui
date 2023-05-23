import { Form, Modal } from 'antd';
import './index.less';

const APP = (props) => {
  const _queryColumns = props.queryColumns;
  const _children = props.children;
  const _open = props.open;

  return (
    <div className="table-wrapper">
      <Modal open={_open}>
        <Form>{_children}</Form>
      </Modal>
    </div>
  );
};

export default APP;
