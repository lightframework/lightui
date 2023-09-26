import apis from '@/constants/apis.json';
import {
  ProForm,
  ProFormList,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useAppData } from '@umijs/max';
import { useState } from 'react';

export default function MenuApiMapForm() {
  const [map, setMap] = useState<Record<string, any>>();
  const data = useAppData();
  const routes = Object.values(data.routes).filter(
    (route) => route.name !== undefined,
  );

  return (
    <>
      <ProForm
        onFinish={async (data) => {
          setMap(data);
        }}
      >
        <ProFormList name="menu2api">
          <div>
            <ProFormSelect
              name="menu"
              width={200}
              options={routes.map((route) => ({
                label: route.name,
                value: route.path,
              }))}
              fieldProps={{
                labelInValue: true,
              }}
            />
            <ProFormSelect
              name="apis"
              mode="multiple"
              width={1000}
              showSearch
              allowClear
              options={Object.entries(apis).map(([key, value]) => ({
                label: key,
                options: value.map((item) => ({
                  label: item.name,
                  value: `${item.method}::${item.path}`,
                })),
              }))}
              fieldProps={{
                labelInValue: true,
              }}
            />
          </div>
        </ProFormList>
      </ProForm>
      <pre>{JSON.stringify(map, null, 2)}</pre>
    </>
  );
}
