import { toLocaleDateTimeString } from '@/utils/func';
import { ProDescriptions } from '@ant-design/pro-components';

export default function HostInfo({ host }: { host: API.HostInfo }) {
  const instance = host.Instance;

  return (
    <div className="py-2">
      <ProDescriptions title="基本信息" className="space-y-3" column={4}>
        <ProDescriptions.Item label="主机名称" copyable span={2}>
          {host.HostName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="主机类型" span={2}>
          {host.HostType.HostType}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="所属环境">
          {host.Env.EnvName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="所属任务ID">
          {host.TaskBillId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="所属项目">
          {host.Project.ProjectName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="状态">{host.State}</ProDescriptions.Item>
        <ProDescriptions.Item label="运维" span={2}>
          {host.OpsSet?.map((ops) => ops.PersonName).join(',') ?? '-'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="应用" span={2}>
          {host.AppSet?.map((app) => `${app.App}:${app.Version}`).join(',') ??
            '-'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建者">
          {host.CreateBy}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建时间" valueType="dateTime">
          {toLocaleDateTimeString(host.CreateAt)}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="更新者">
          {host.UpdateBy}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="更新时间" valueType="dateTime">
          {host.UpdateAt}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="备注" span={4}>
          {host.Description}
        </ProDescriptions.Item>
      </ProDescriptions>
      <ProDescriptions title="实例信息" className="space-y-3" column={4}>
        <ProDescriptions.Item label="实例名称">
          {instance.InstanceName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="实例Id">
          {instance.InstanceId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="实例状态">
          {instance.InstanceState}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="实例类型">
          {instance.InstanceType}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="付费方式">
          {instance.InstanceChargeType}
        </ProDescriptions.Item>
      </ProDescriptions>
    </div>
  );
}
