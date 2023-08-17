import { NavLink, Outlet } from '@umijs/max';
import clsx from 'clsx';

export type TabItem = {
  label: string;
  to: string;
};

export default function LinkTabs({
  items,
  top = false,
  withOutlet = false,
}: {
  items: TabItem[];
  top?: boolean;
  withOutlet?: boolean;
}) {
  return (
    <>
      <div
        className={clsx(
          'mb-2 flex gap-x-4 border-0 border-b border-solid border-[rgba(0,0,0,.08)] px-4',
          top && '-my-2',
        )}
      >
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'p-3',
                isActive
                  ? 'underline decoration-2 underline-offset-[12px] hover:underline hover:decoration-2'
                  : 'text-black',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {withOutlet ? <Outlet /> : null}
    </>
  );
}
