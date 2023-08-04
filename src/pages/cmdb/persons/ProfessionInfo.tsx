import { professionReadOneApiCmdbProfessionsByUid } from '@/services/cmdb/profession';
import { ProDescriptions } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import ProfessionDeleteModalForm from './ProfessionDeleteModalForm';
import ProfessionUpdateModalForm from './ProfessionUpdateModalForm';

export default function ProfessionInfo({
  professionUid,
  onUpdateFinish,
}: {
  professionUid: string;
  onUpdateFinish?: VoidFunction;
}) {
  const { data: profession, refetch: refetchProfession } = useQuery({
    queryKey: ['profession-info', professionUid],
    queryFn: () =>
      professionReadOneApiCmdbProfessionsByUid({ uid: professionUid }).then(
        (res) => res.data,
      ),
  });

  if (!profession) {
    return;
  }

  return (
    <ProDescriptions<API.ProfessionInfo>
      title={profession?.ProfessionName}
      column={3}
      className="p-5"
      extra={
        <div>
          <ProfessionUpdateModalForm
            professionUid={profession.Uid!}
            initialValues={profession}
            onFinish={() => {
              refetchProfession();
              onUpdateFinish?.();
            }}
          />
          <ProfessionDeleteModalForm
            professionUid={profession.Uid!}
            professionName={profession.ProfessionName}
            professionId={profession.ProfessionId}
            onFinish={onUpdateFinish}
          />
        </div>
      }
    >
      <ProDescriptions.Item label="创建时间" valueType="dateTime">
        {profession?.createAt}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="创建人" valueType="text" span={2}>
        {profession?.createBy}
      </ProDescriptions.Item>
      <ProDescriptions.Item label="备注" valueType="text" span={3}>
        {profession?.Description}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
}
