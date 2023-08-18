import Table, { TableColumns } from '@/components/ui/Table';
import {
  useCloudOptions,
  useRegionOptions,
  useZoneOptions,
} from '@/hooks/request-data';
import {
  ActionType,
  ProDescriptions,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormList,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import { useRef } from 'react';

type TmpHostInfo = {
  Hostname: string;
  Zone: string;
  Config: string;
  Count: number;
};

function TmpHostTable() {
  const tableRef = useRef<ActionType>();

  const columns: TableColumns<TmpHostInfo> = [
    {
      title: '主机名',
      key: 'Hostname',
      dataIndex: 'Hostname',
      ellipsis: true,
    },
    {
      title: '可用区',
      key: 'Zone',
      dataIndex: 'Zone',
      ellipsis: true,
    },
    {
      title: '配置',
      key: 'Config',
      dataIndex: 'Config',
      width: 100,
    },
    {
      title: '数量',
      key: 'Count',
      dataIndex: 'Count',
      width: 50,
    },
    {
      title: '操作',
      key: 'options',
      className: 'xl:w-[140px]',
      render: () => {
        return (
          <div className="inline-flex flex-wrap gap-1.5">
            <Button type="link">复制</Button>
            <Button type="link" danger>
              移除
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-5/12">
      <Table<TmpHostInfo>
        className="env-add-host-table"
        actionRef={tableRef}
        title="env-add-hosts"
        columns={columns}
        rowKey="Zone"
        request={async () => ({
          msg: 'OK',
          code: 2000,
          data: {
            list: [
              {
                Hostname: 'POP-{number}-Shanghai-tc',
                Zone: 'Shanghai-1',
                Config: '4c8g',
                Count: 3,
              },
              {
                Hostname: 'POP-{number}-Shanghai-tc',
                Zone: 'Shanghai-2',
                Config: '1c2g',
                Count: 3,
              },
            ],
            total: 2,
          },
        })}
      />
    </div>
  );
}

function HostAddForm() {
  const [form] = Form.useForm();

  const cloudUid = Form.useWatch('cloudUid', form);
  const regionUid = Form.useWatch('regionUid', form);

  const cloudOptions = useCloudOptions();
  const regionOptions = useRegionOptions(cloudUid);
  const zoneOptions = useZoneOptions(regionUid);

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

      <ProForm
        className="env-add-host-form"
        form={form}
        title="配置信息"
        layout="horizontal"
      >
        <h3 className="mb-3 text-sm font-semibold">配置信息</h3>

        <div className="grid grid-cols-1 gap-x-3 md:grid-cols-2 xl:grid-cols-3">
          <ProFormSelect label="云商" name="cloudUid" options={cloudOptions} />
          <ProFormSelect
            label="区域"
            name="regionUid"
            options={regionOptions}
          />
          <ProFormSelect label="可用区" name="zoneUid" options={zoneOptions} />

          <ProFormSelect
            label="付费方式"
            name="payment"
            options={[
              {
                label: '包年包月',
                value: '包年包月',
              },
            ]}
          />

          <ProFormDatePicker label="释放时间" name="releaseDate" />
          <ProFormCheckbox label="自动续费" name="describe" />
          <ProFormSelect
            label="资源规格"
            name="configuration"
            options={[{ label: '2c4g', value: '2c4g' }]}
          />
          <ProFormSelect
            label="镜像名称"
            name="imageUid"
            options={[{ label: 'centos-7', value: 'centos-7' }]}
          />
          <ProFormSelect
            label="系统盘"
            name="systemDisk"
            options={[{ label: '高效云盘-500G', value: '高效云盘-500G' }]}
          />
          <ProFormList
            className="col-span-3"
            label="数据盘"
            name="dataDisk"
            copyIconProps={false}
          >
            <ProFormSelect
              options={[{ label: '高效云盘-500G', value: '高效云盘-500G' }]}
            />
          </ProFormList>
        </div>
      </ProForm>
    </div>
  );
}

export default function HostAdd() {
  return (
    <div className="flex gap-3">
      <TmpHostTable />
      <HostAddForm />
    </div>
  );
}
