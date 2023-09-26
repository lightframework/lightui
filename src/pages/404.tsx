import { history } from '@umijs/max';
import { Button, Result } from 'antd';

export default function NotFound() {
  return (
    <div className="grid place-items-center h-full">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            首页
          </Button>
        }
      />
    </div>
  );
}
