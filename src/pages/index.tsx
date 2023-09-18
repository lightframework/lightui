// import PageContainer from '@/components/ui/PageContainer';
// import apis from '@/constants/apis.json';
// import {
//   ProForm,
//   ProFormList,
//   ProFormSelect,
// } from '@ant-design/pro-components';
// import { useAppData } from '@umijs/max';
// import { useState } from 'react';

import PageContainer from '@/components/ui/PageContainer';

// export default function Home() {
//   const [map, setMap] = useState<Record<string, any>>();
//   const data = useAppData();
//   const routes = Object.entries(data.routes)
//     .map(([_, value]) => value)
//     .filter((route) => route.name !== undefined);

//   return (
//     <PageContainer>
//       <ProForm
//         onFinish={async (data) => {
//           setMap(data);
//         }}
//       >
//         <ProFormList name="menu2api">
//           <div>
//             <ProFormSelect
//               name="menu"
//               width={200}
//               options={routes.map((route) => ({
//                 label: route.name,
//                 value: route.path,
//                 ...route,
//               }))}
//             />
//             <ProFormSelect
//               name="apis"
//               mode="multiple"
//               width={1000}
//               showSearch
//               allowClear
//               options={Object.entries(apis).map(([key, value]) => ({
//                 label: key,
//                 options: value.map((item) => ({
//                   label: item.name,
//                   value: `${item.method}::${item.path}`,
//                 })),
//               }))}
//             />
//           </div>
//         </ProFormList>
//       </ProForm>
//       <pre>{JSON.stringify(map, null, 2)}</pre>
//     </PageContainer>
//   );
// }

export default function Home() {
  return <PageContainer>Homes</PageContainer>;
}
