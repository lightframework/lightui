import { TableColumns } from '@/components/ui/Table';
import {
  useCloudOptions,
  useCloudTagOptions,
  useEnvOptions,
  useHostTypeOptions,
  useImageOptions,
  usePersonOptions,
  useProjectOptions,
  useRegionOptions,
  useSecurityGroupOptions,
  useSubnetOptions,
  useVpcOptions,
  useZoneOptions,
} from '@/hooks/options';
import { cloudReadOneApiCmdbCloudsByUid } from '@/services/cmdb/cloud';
import { cloudTagReadOneApiCmdbCloudtagsByUid } from '@/services/cmdb/cloudTag';
import { regionReadOneApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { zoneReadOneApiCmdbZonesByUid } from '@/services/cmdb/zone';

import {
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';

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
  extraInfo: {
    hostname?: string;
    region?: string;
  };
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
      render: (_, row) => row.extraInfo.hostname,
    },
    {
      title: '可用区',
      key: 'zone',
      render: (_, row) => row.extraInfo.region,
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

function useHostBaseInfo({
  cloudUid,
  regionUid,
  zoneUid,
  cloudTagUid,
  count,
}: {
  cloudUid?: string;
  regionUid?: string;
  zoneUid?: string;
  cloudTagUid?: string;
  count?: string;
}) {
  const { data: cloud } = useQuery({
    queryKey: ['hostname', 'cloud', cloudUid],
    queryFn: () =>
      cloudReadOneApiCmdbCloudsByUid({ uid: cloudUid! }).then(
        (res) => res.data,
      ),
    enabled: cloudUid !== undefined,
  });

  const { data: region } = useQuery({
    queryKey: ['hostname', 'region', regionUid],
    queryFn: () =>
      regionReadOneApiCmdbRegionsByUid({ uid: regionUid! }).then(
        (res) => res.data,
      ),
    enabled: regionUid !== undefined,
  });

  const { data: zone } = useQuery({
    queryKey: ['hostname', 'zone', zoneUid],
    queryFn: () =>
      zoneReadOneApiCmdbZonesByUid({ uid: zoneUid! }).then((res) => res.data),
    enabled: zoneUid !== undefined,
  });

  const { data: cloudTag } = useQuery({
    queryKey: ['hostname', 'cloud-tag', cloudTagUid],
    queryFn: () =>
      cloudTagReadOneApiCmdbCloudtagsByUid({ uid: cloudTagUid! }).then(
        (res) => res.data,
      ),
    enabled: cloudTagUid !== undefined,
  });

  const hostname = `${cloudTag?.Value ?? '标签'}-${count}-${
    region?.Region ?? '区域'
  }-${cloud?.Cloud ?? '云商'}`;

  return {
    cloud: cloud,
    region: region,
    cloudTag: cloudTag,
    zone: zone,
    count,
    hostname,
  };
}

function HostAddForm({
  onHostAdd,
}: {
  onHostAdd?: (host: TmpHostInfo) => void;
}) {
  const [form] = Form.useForm();

  const envUid: string | undefined = Form.useWatch('envUid', form);
  const cloudUid: string | undefined = Form.useWatch('cloudUid', form);
  const regionUid: string | undefined = Form.useWatch('regionUid', form);
  const vpcUid: string | undefined = Form.useWatch('vpcUid', form);
  const cloudTagUid: string | undefined = Form.useWatch('cloudTagUid', form);
  const zoneUid: string | undefined = Form.useWatch('zoneUid', form);
  const count: string | undefined = Form.useWatch('count', form);

  const envOptions = useEnvOptions();
  const projectOptions = useProjectOptions(envUid);
  const hostTypeOptions = useHostTypeOptions();
  const opsPersonOptions = usePersonOptions('运维');

  const cloudOptions = useCloudOptions();
  const regionOptions = useRegionOptions(cloudUid);
  const cloudTagOptions = useCloudTagOptions(cloudUid);
  const zoneOptions = useZoneOptions(regionUid);
  const vpcOptions = useVpcOptions(regionUid);
  const securityGroupOptions = useSecurityGroupOptions(regionUid);
  const imageOptions = useImageOptions(regionUid);
  const subnetOptions = useSubnetOptions(vpcUid);

  const { hostname, region } = useHostBaseInfo({
    cloudUid,
    zoneUid,
    regionUid,
    cloudTagUid,
    count,
  });

  useEffect(() => {
    form.resetFields(['projectUid']);
  }, [envUid]);

  useEffect(() => {
    form.resetFields(['regionUid', 'cloudTagUid']);
  }, [cloudUid]);

  useEffect(() => {
    form.resetFields(['zoneUid', 'vpcUid', 'imageUid', 'securityGroupUids']);
  }, [regionUid]);

  useEffect(() => {
    form.resetFields(['subnetUid']);
  }, [vpcUid]);

  return (
    <div className="w-7/12 space-y-3 border border-solid border-[rgba(0,0,0,.08)] p-3">
      <ProForm
        className="env-add-host-form"
        form={form}
        layout="horizontal"
        submitter={{
          render: (_, dom) => [<div key="space" className="w-full" />, ...dom],
        }}
        onFinish={async (data) => {
          const dataDisks =
            data.dataDisks === undefined
              ? []
              : data.dataDisks.map(
                  (item: { dataDisk: string }) => item.dataDisk,
                );

          onHostAdd?.({
            ...data,
            dataDisks,
            extraInfo: { hostname, region: region?.Region },
          });
        }}
      >
        <div className="xl:grid xl:grid-cols-3">
          <h3 className="mb-3 text-sm font-semibold xl:col-span-3">管理信息</h3>

          <ProFormSelect
            label="所属环境"
            name="envUid"
            options={envOptions}
            rules={[
              {
                required: true,
                message: '请选择环境',
              },
            ]}
          />

          <div className="col-span-2">
            <ProFormText
              label="主机名"
              fieldProps={{
                value: hostname,
                bordered: false,
                allowClear: false,
              }}
            />
          </div>

          <ProFormSelect
            label="项目"
            name="projectUid"
            options={projectOptions}
            rules={[
              {
                required: true,
                message: '请选择项目',
              },
            ]}
          />

          <ProFormSelect
            mode="multiple"
            label="运维"
            name="opsUids"
            options={opsPersonOptions}
          />

          <ProFormSelect
            label="主机类型"
            name="hosttypeUid"
            options={hostTypeOptions}
            rules={[
              {
                required: true,
                message: '请选择主机类型',
              },
            ]}
          />

          <div className="col-span-3">
            <ProFormTextArea label="备注" />
          </div>
        </div>

        <div className="xl:grid xl:grid-cols-3">
          <h3 className="col-span-3 mb-3 text-sm font-semibold">配置信息</h3>

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
            options={imageOptions}
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

          <div className="col-span-3">
            <ProFormSelect
              mode="multiple"
              label="安全组（多选）"
              name="securityGroupUids"
              options={securityGroupOptions}
            />
          </div>

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
            name="cloudTagUid"
            options={cloudTagOptions}
            rules={[
              {
                required: true,
                message: '请选择标签',
              },
            ]}
          />

          <div className="col-span-3">
            <ProFormDigit
              label="数量"
              name="count"
              min={1}
              initialValue={1}
              fieldProps={{ precision: 0 }}
            />
          </div>
        </div>
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
