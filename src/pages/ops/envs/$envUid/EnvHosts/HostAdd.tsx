import { TableColumns } from '@/components/ui/Table';
import {
  useCloudOptions,
  useCloudTagOptions,
  useRegionOptions,
  useSecurityGroupOptions,
  useSubnetOptions,
  useVpcOptions,
  useZoneOptions,
} from '@/hooks/request-data';
import {
  ProDescriptions,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import { useState } from 'react';

type TmpHostInfo = {
  Uid: number;
  cloudUid: string;
  regionUid: string;
  zoneUid: string;
  payment: string;
  releaseDate: string;
  describe: boolean;
  configuration: string;
  imageUid: string;
  systemDisk: string;
  dataDisks: string[];
  vpcUid: string;
  subnetUid: string;
  bandwidth: string;
  securityGroupUids: string[];
  authorization: string;
  tagUid: string;
  count: number;
};

function TmpHostTable({
  dataSource,
  onCopy,
  onRemove,
}: {
  dataSource: TmpHostInfo[];
  onCopy?: (host: TmpHostInfo) => void;
  onRemove?: (host: TmpHostInfo) => void;
}) {
  const columns: TableColumns<TmpHostInfo> = [
    {
      title: '主机名',
      key: 'hostname',
      ellipsis: true,
      width: 200,
      render: (_, row) =>
        `${row.tagUid}-{number}-${row.regionUid}-${row.cloudUid}`,
    },
    {
      title: '可用区',
      key: 'zone',
      render: (_, row) => row.zoneUid,
      ellipsis: true,
      width: 100,
    },
    {
      title: '配置',
      key: 'configuration',
      dataIndex: 'configuration',
      width: 100,
    },
    {
      title: '数量',
      key: 'count',
      dataIndex: 'count',
      width: 60,
    },
    {
      title: '操作',
      key: 'options',
      width: 140,
      render: (_, row) => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button type="link" onClick={() => onCopy?.(row)}>
              复制
            </Button>
            <Button type="link" danger onClick={() => onRemove?.(row)}>
              移除
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-5/12">
      <ProTable
        className="env-add-host-table"
        columns={columns}
        rowKey="zone"
        dataSource={dataSource}
      />
    </div>
  );
}

let Uid = 1;

function HostAddForm({
  onHostAdd,
}: {
  onHostAdd?: (host: TmpHostInfo) => void;
}) {
  const [form] = Form.useForm();

  const cloudUid = Form.useWatch('cloudUid', form);
  const regionUid = Form.useWatch('regionUid', form);
  const vpcUid = Form.useWatch('vpcUid', form);

  // const cloudOptions = useOptions(
  //   cloudOptionsApiCmdbCloudsOptions,
  //   'CloudName',
  // );
  // console.log(cloudOptions);

  const cloudOptions = useCloudOptions();
  const regionOptions = useRegionOptions(cloudUid);
  const zoneOptions = useZoneOptions(regionUid);
  const vpcOptions = useVpcOptions(regionUid);
  const subnetOptions = useSubnetOptions(vpcUid);
  const securityGroupOptions = useSecurityGroupOptions(regionUid);
  const cloudTagOptions = useCloudTagOptions(cloudUid);

  return (
    <div className="w-7/12 space-y-3 border border-solid border-[rgba(0,0,0,.08)] p-3">
      <ProDescriptions
        bordered
        title="管理信息"
        column={3}
        size="small"
        className="space-y-3"
      >
        <ProDescriptions.Item label="所属环境" valueType="text">
          香港orch
        </ProDescriptions.Item>
        <ProDescriptions.Item label="项目" valueType="text">
          万达项目
        </ProDescriptions.Item>
        <ProDescriptions.Item label="运维" valueType="text">
          马一鸣
        </ProDescriptions.Item>
        <ProDescriptions.Item label="主机类型" valueType="text">
          8-POP
        </ProDescriptions.Item>
        <ProDescriptions.Item label="主机名" valueType="text" span={2}>
          {'POP-{number}-Beijing-tc'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="备注" valueType="text">
          描述信息
        </ProDescriptions.Item>
      </ProDescriptions>

      <h3 className="mb-3 text-sm font-semibold">配置信息</h3>

      <ProForm
        className="env-add-host-form"
        form={form}
        title="配置信息"
        layout="horizontal"
        onFinish={async (values) => {
          console.log(values.dataDisks);
          const dataDisks =
            values.dataDisks === undefined
              ? []
              : (values.dataDisks as { dataDisk: string }[]).map(
                  (item) => item.dataDisk,
                );
          const securityGroupUids =
            values.securityGroups === undefined
              ? []
              : (values.securityGroups as { securityGroup: string }[]).map(
                  (item) => item.securityGroup,
                );
          onHostAdd?.({ ...values, dataDisks, securityGroupUids, Uid: Uid++ });
        }}
      >
        <ProFormSelect
          label="云商"
          name="cloudUid"
          options={cloudOptions}
          rules={[
            {
              required: true,
              message: '请选择云商',
            },
          ]}
        />
        <ProFormSelect
          label="区域"
          name="regionUid"
          options={regionOptions}
          rules={[
            {
              required: true,
              message: '请选择区域',
            },
          ]}
        />
        <ProFormSelect
          label="可用区"
          name="zoneUid"
          options={zoneOptions}
          rules={[
            {
              required: true,
              message: '请选择可用区',
            },
          ]}
        />

        <ProFormSelect
          label="付费方式"
          name="payment"
          options={[
            {
              label: '包年包月',
              value: '包年包月',
            },
          ]}
          rules={[
            {
              required: true,
              message: '请选择付费方式',
            },
          ]}
        />

        <ProFormDatePicker
          label="释放时间"
          name="releaseDate"
          rules={[
            {
              required: true,
              message: '请选择释放时间',
            },
          ]}
        />
        <ProFormCheckbox label="自动续费" name="describe" />
        <ProFormSelect
          label="资源规格"
          name="configuration"
          options={[{ label: '2c4g', value: '2c4g' }]}
          rules={[
            {
              required: true,
              message: '请选择资源规格',
            },
          ]}
        />
        <ProFormSelect
          label="镜像名称"
          name="imageUid"
          options={[{ label: 'centos-7', value: 'centos-7' }]}
          rules={[
            {
              required: true,
              message: '请选择镜像',
            },
          ]}
        />
        <ProFormSelect
          label="系统盘"
          name="systemDisk"
          options={[{ label: '高效云盘-500G', value: '高效云盘-500G' }]}
          rules={[
            {
              required: true,
              message: '请选择系统盘',
            },
          ]}
        />
        <ProFormList
          label="数据盘（多选）"
          name="dataDisks"
          copyIconProps={false}
        >
          <ProFormSelect
            name="dataDisk"
            options={[{ label: '高效云盘-500G', value: '高效云盘-500G' }]}
          />
        </ProFormList>
        <ProFormSelect
          label="VPC"
          name="vpcUid"
          options={vpcOptions}
          rules={[
            {
              required: true,
              message: '请选择VPC',
            },
          ]}
        />
        <ProFormSelect
          label="子网"
          name="subnetUid"
          options={subnetOptions}
          rules={[
            {
              required: true,
              message: '请选择子网',
            },
          ]}
        />
        <ProFormSelect
          label="带宽"
          name="bandwidth"
          options={[
            {
              label: '500M',
              value: '500M',
            },
            {
              label: '1G',
              value: '1G',
            },
          ]}
          rules={[
            {
              required: true,
              message: '请选择带宽',
            },
          ]}
        />
        <ProFormList
          label="安全组（多选）"
          name="securityGroups"
          copyIconProps={false}
        >
          <ProFormSelect name="securityGroup" options={securityGroupOptions} />
        </ProFormList>
        <ProFormSelect
          label="登录方式"
          name="authorization"
          options={[
            {
              label: '账号密码',
              value: '账号密码',
            },
          ]}
          rules={[
            {
              required: true,
              message: '请选择登录方式',
            },
          ]}
        />
        <ProFormSelect
          label="标签"
          name="tagUid"
          options={cloudTagOptions}
          rules={[
            {
              required: true,
              message: '请选择标签',
            },
          ]}
        />
        <ProFormDigit
          label="数量"
          name="count"
          min={1}
          initialValue={1}
          fieldProps={{ precision: 0 }}
        />
      </ProForm>
    </div>
  );
}

export default function HostAdd() {
  const [hosts, setHosts] = useState<TmpHostInfo[]>([]);

  return (
    <div className="flex gap-3">
      <TmpHostTable
        dataSource={hosts}
        onCopy={(host) =>
          setHosts((prev) => [...prev, { ...host, Uid: Uid++ }])
        }
        onRemove={(host) =>
          setHosts((prev) => prev.filter((item) => item.Uid !== host.Uid))
        }
      />
      <HostAddForm onHostAdd={(host) => setHosts((prev) => [...prev, host])} />
    </div>
  );
}
