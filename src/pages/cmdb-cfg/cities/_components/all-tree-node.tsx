import { useToken } from '@ant-design/pro-components';
import { Link, useLocation } from '@umijs/max';

export function AllTreeNode({ title }: { title: string }) {
  const { token } = useToken();
  const { search } = useLocation();
  const isActive = !search;

  return (
    <Link
      to="."
      className="block w-full px-3 py-1.5 hover:bg-[#f1f4fe]"
      style={
        isActive
          ? {
              backgroundColor: token.colorPrimaryBg,
              color: token.colorLink,
            }
          : {
              color: token.colorText,
            }
      }
    >
      {title}
    </Link>
  );
}
