import { TableColumns } from '@/components/ui/Table';
import {
  useCloudOptions,
  useCloudTagOptions,
  useEnvOptions,
  useHostTypeOptions,
  useImageOptions,
  useInstanceTypeOptions,
  usePersonOptions,
  useProjectOptions,
  useRegionOptions,
  useSecurityGroupOptions,
  useSubnetOptions,
  useVpcOptions,
  useZoneOptions,
} from '@/hooks/options';
import { v4 as uuidv4 } from 'uuid';
import './AddHostModalForm.less';

import {
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { Button, Form, Modal, message } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import AddHostSubmitModalForm from './AddHostSubmitModalForm';

type Bill = API.InstanceTaskBill & { uuid: string };

function TmpHostTable({
  dataSource,
  onCopy,
  onRemove,
}: {
  dataSource: Bill[];
  onCopy?: (host: Bill) => void;
  onRemove?: (host: Bill) => void;
}) {
  const columns: TableColumns<Bill> = [
    {
      title: '主机名',
      key: 'hostname',
      ellipsis: true,
      width: 200,
      render: (_, row) => {
        const ruleDefinition = row.HostType.RuleDefinition;
        return ruleDefinition
          .replace('{cloud}', row.Cloud.Cloud)
          .replace('{region}', row.Region.Region)
          .replace('zone', row.Zone.Zone);
      },
    },
    {
      title: '可用区',
      key: 'Zone',
      render: (_, row) => row.Zone.ZoneName,
      ellipsis: true,
      width: 100,
    },
    {
      title: '配置',
      key: 'InstanceType',
      render: (_, row) => row.InstanceType.TypeName,
      width: 100,
    },
    {
      title: '数量',
      key: 'Count',
      dataIndex: 'InstanceCount',
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

function DiskSelectGroup({ label }: { label?: string }) {
  return (
    <div className={clsx('flex', label && 'gap-x-[104px]')}>
      <ProFormSelect
        fieldProps={{
          style: { width: 200 },
        }}
        label={label}
        name="DiskType"
        options={[
          {
            label: 'SSD云硬盘',
            value: 'CLOUD_SSD',
          },
          {
            label: '高性能云硬盘',
            value: 'CLOUD_PREMIUM',
          },
        ]}
        rules={[
          {
            required: true,
            message: '请选择硬盘类型',
          },
        ]}
      />

      <ProFormDigit
        className="disk-size-input"
        initialValue={50}
        name="DiskSize"
        min={50}
        max={2000}
        placeholder=""
        fieldProps={{
          step: 50,
          addonAfter: 'GB',
          style: { width: 110 },
        }}
      />
    </div>
  );
}

type FormData = {
  envUid: string;
  projectUid: string;
  cloudUid: string;
  hostTypeUid: string;
  regionUid: string;
  zoneUid: string;
  vpcUid: string;
  subnetUid: string;
  imageUid: string;
  instanceTypeUid: string;
  securityGroupUids: string[];
  cloudTagUids: string[];
  opsUids: string[];

  DiskSize: string;
  DiskType: string;

  Password: string;

  DataDisks: { DiskSize: string; DiskType: string }[];
  Description: string;
  InstanceChargeType: string;
  Period: number;
  RenewFlag: string;
  InternetMaxBandwidthOut: number;
  InstanceCount: number;
};

function HostAddForm({
  env,
  onHostAdd,
}: {
  env?: API.EnvOption;
  onHostAdd: (host: Bill) => void;
}) {
  const { pathname } = useLocation();
  const isHostManagementPage = pathname.startsWith('/cmdb/hosts');

  const [hostname, setHostname] = useState('');

  const [form] = Form.useForm<FormData>();

  const cloudUid = Form.useWatch('cloudUid', form);
  const regionUid = Form.useWatch('regionUid', form);
  const vpcUid = Form.useWatch('vpcUid', form);
  const zoneUid = Form.useWatch('zoneUid', form);
  const hostTypeUid = Form.useWatch('hostTypeUid', form);
  const envUid = Form.useWatch('envUid', form);

  const instanceChargeType = Form.useWatch('InstanceChargeType', form);

  const envOptions = useEnvOptions();
  const projectOptions = useProjectOptions(
    isHostManagementPage ? envUid : env?.Uid,
  );
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
  const instanceTypeOptions = useInstanceTypeOptions(zoneUid);

  useEffect(() => {
    const selectedHostType = hostTypeOptions.options.find(
      (item) => item.Uid === hostTypeUid,
    );
    if (selectedHostType) {
      let ruleDefinition = selectedHostType.RuleDefinition;

      const cloud = cloudOptions.options.find((item) => item.Uid === cloudUid);
      if (cloud) {
        ruleDefinition = ruleDefinition.replace('{cloud}', cloud.Cloud);
      }
      const region = regionOptions.options.find(
        (item) => item.Uid === regionUid,
      );
      if (region) {
        ruleDefinition = ruleDefinition.replace('{region}', region.Region);
      }
      const zone = zoneOptions.options.find((item) => item.Uid === zoneUid);
      if (zone) {
        ruleDefinition = ruleDefinition.replace('{zone}', zone.Zone);
      }

      const selectedEnv =
        env ?? envOptions.options.find((item) => item.Uid === envUid);
      if (selectedEnv) {
        ruleDefinition = ruleDefinition.replace('{env}', selectedEnv.EnvName);
      }

      setHostname(ruleDefinition);
    }
  }, [hostTypeUid, cloudUid, regionUid, zoneUid, env, envUid]);

  useEffect(() => {
    form.resetFields(['regionUid', 'cloudTagUid']);
  }, [cloudUid]);

  useEffect(() => {
    form.resetFields(['zoneUid', 'vpcUid', 'imageUid', 'securityGroupUids']);
  }, [regionUid]);

  useEffect(() => {
    form.resetFields(['subnetUid']);
  }, [vpcUid]);

  useEffect(() => {
    form.resetFields(['instanceTypeUid']);
  }, [zoneUid]);

  if (!env && !isHostManagementPage) {
    throw new Error('need env prop in env-host page ');
  }

  return (
    <div className="w-7/12 space-y-3 overflow-y-auto border border-solid border-[rgba(0,0,0,.08)] p-3">
      <ProForm
        className="env-add-host-form"
        form={form}
        layout="horizontal"
        submitter={{
          searchConfig: {
            resetText: '重置',
            submitText: '添加',
          },
          render: (_, dom) => [<div key="space" className="w-full" />, ...dom],
        }}
        onFinish={async (data) => {
          console.log(data);

          const Project = projectOptions.options.find(
            (item) => item.Uid === data.projectUid,
          )!;
          const Cloud = cloudOptions.options.find(
            (item) => item.Uid === data.cloudUid,
          )!;
          const Region = regionOptions.options.find(
            (item) => item.Uid === data.regionUid,
          )!;
          const Zone = zoneOptions.options.find(
            (item) => item.Uid === data.zoneUid,
          )!;
          const Vpc = vpcOptions.options.find(
            (item) => item.Uid === data.vpcUid,
          )!;
          const Subnet = subnetOptions.options.find(
            (item) => item.Uid === data.subnetUid,
          )!;
          const Ops =
            data.opsUids !== undefined
              ? data.opsUids.map(
                  (uid) =>
                    opsPersonOptions.options.find((item) => item.Uid === uid)!,
                )
              : [];
          const SecurityGroups =
            data.securityGroupUids !== undefined
              ? data.securityGroupUids.map(
                  (uid) =>
                    securityGroupOptions.options.find(
                      (item) => item.Uid === uid,
                    )!,
                )
              : [];
          const CloudTags =
            data.cloudTagUids !== undefined
              ? data.cloudTagUids.map(
                  (uid) =>
                    cloudTagOptions.options.find((item) => item.Uid === uid)!,
                )
              : [];
          const HostType = hostTypeOptions.options.find(
            (item) => item.Uid === data.hostTypeUid,
          )!;
          const InstanceType = instanceTypeOptions.options.find(
            (item) => item.Uid === data.instanceTypeUid,
          )!;
          const Image = imageOptions.options.find(
            (item) => item.Uid === data.imageUid,
          )!;

          let Env: API.EnvOption;
          if (isHostManagementPage) {
            Env = envOptions.options.find((item) => item.Uid === data.envUid)!;
          } else {
            Env = env!;
          }

          const bill: Bill = {
            uuid: uuidv4(),
            Cloud,
            CloudTags,
            DataDisks:
              data.DataDisks === undefined
                ? []
                : data.DataDisks.map((item) => ({
                    DiskType: item.DiskType,
                    DiskSize: String(item.DiskSize),
                  })),
            Description: data.Description,
            Env,
            HostType,
            InstanceChargePrepaid: {
              Period: data.Period ?? 12,
              RenewFlag: data.RenewFlag ?? 'NOTIFY_AND_MANUAL_RENEW',
            },
            Image,
            InstanceChargeType: data.InstanceChargeType,
            InstanceCount: data.InstanceCount,
            InstanceType,
            InternetMaxBandwidthOut: data.InternetMaxBandwidthOut,
            Password: data.Password,
            Project,
            Region,
            SecurityGroups,
            Subnet,
            SystemDisk: {
              DiskSize: String(data.DiskSize),
              DiskType: data.DiskType,
            },
            Vpc,
            Zone,
            Ops,
          };

          console.log(bill);

          onHostAdd(bill);
        }}
      >
        <div className="xl:grid xl:grid-cols-3">
          <h3 className="mb-3 text-sm font-semibold xl:col-span-3">管理信息</h3>

          {isHostManagementPage ? (
            <ProFormSelect
              label="所属环境"
              name="envUid"
              options={envOptions.selectOptions}
              rules={[
                {
                  required: true,
                  message: '请选择所属环境',
                },
              ]}
            />
          ) : (
            <ProFormText
              label="所属环境"
              placeholder=""
              fieldProps={{
                value: '香港Orch',
                bordered: false,
                allowClear: false,
              }}
            />
          )}

          <div className="col-span-2">
            <ProFormText
              label="主机名"
              placeholder=""
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
            options={projectOptions.selectOptions}
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
            options={opsPersonOptions.selectOptions}
          />

          <ProFormSelect
            label="主机类型"
            name="hostTypeUid"
            options={hostTypeOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择主机类型',
              },
            ]}
          />

          <div className="col-span-3">
            <ProFormTextArea
              label="备注"
              name="Description"
              fieldProps={{ rows: 1 }}
            />
          </div>
        </div>

        <div className="xl:grid xl:grid-cols-3">
          <h3 className="col-span-3 mb-3 text-sm font-semibold">配置信息</h3>

          <ProFormSelect
            label="云商"
            name="cloudUid"
            options={cloudOptions.selectOptions}
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
            options={regionOptions.selectOptions}
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
            options={zoneOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择可用区',
              },
            ]}
          />

          <ProFormSelect
            label="付费方式"
            name="InstanceChargeType"
            options={[
              {
                label: '包年包月',
                value: 'PREPAID',
              },
              { label: '按时付费', value: 'POSTPAID_BY_HOUR' },
            ]}
            rules={[
              {
                required: true,
                message: '请选择付费方式',
              },
            ]}
          />

          {instanceChargeType === 'POSTPAID_BY_HOUR' ? (
            <ProFormSelect
              label="时长（月）"
              name="Period"
              initialValue={1}
              options={[
                {
                  label: '1',
                  value: 1,
                },
                {
                  label: '2',
                  value: 2,
                },
                {
                  label: '3',
                  value: 3,
                },
                {
                  label: '4',
                  value: 4,
                },
                {
                  label: '5',
                  value: 5,
                },
                {
                  label: '6',
                  value: 6,
                },
                {
                  label: '7',
                  value: 7,
                },
                {
                  label: '8',
                  value: 8,
                },
                {
                  label: '9',
                  value: 9,
                },
                {
                  label: '10',
                  value: 10,
                },
                {
                  label: '11',
                  value: 11,
                },
                {
                  label: '12',
                  value: 12,
                },
                {
                  label: '24',
                  value: 24,
                },
                {
                  label: '36',
                  value: 36,
                },
                {
                  label: '48',
                  value: 48,
                },
                {
                  label: '60',
                  value: 60,
                },
              ]}
              rules={[
                {
                  required: true,
                  message: '请选择释放时间',
                },
              ]}
            />
          ) : instanceChargeType === 'PREPAID' ? (
            <ProFormSelect
              label="续费模式"
              name="RenewFlag"
              initialValue="NOTIFY_AND_MANUAL_RENEW"
              options={[
                {
                  label: '通知过期且自动续费',
                  value: 'NOTIFY_AND_AUTO_RENEW',
                },
                {
                  label: '通知过期不自动续费',
                  value: 'NOTIFY_AND_MANUAL_RENEW',
                },
                {
                  label: '不通知过期不自动续费',
                  value: 'DISABLE_NOTIFY_AND_MANUAL_RENEW',
                },
              ]}
            />
          ) : (
            <div />
          )}

          <div />

          <ProFormSelect
            label="资源规格"
            name="instanceTypeUid"
            options={instanceTypeOptions.selectOptions}
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
            options={imageOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择镜像',
              },
            ]}
          />

          <div className="col-span-3">
            <DiskSelectGroup label="系统盘" />

            <ProFormList label="数据盘（多选）" name="DataDisks">
              <DiskSelectGroup />
            </ProFormList>
          </div>

          <ProFormSelect
            label="VPC"
            name="vpcUid"
            options={vpcOptions.selectOptions}
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
            options={subnetOptions.selectOptions}
            rules={[
              {
                required: true,
                message: '请选择子网',
              },
            ]}
          />

          <ProFormSelect
            label="带宽"
            name="InternetMaxBandwidthOut"
            options={[
              {
                label: '500M',
                value: 500,
              },
              {
                label: '1G',
                value: 1000,
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
              options={securityGroupOptions.selectOptions}
            />
          </div>

          <div className="col-span-3">
            <ProFormSelect
              label="标签（多选）"
              mode="multiple"
              name="cloudTagUids"
              options={cloudTagOptions.selectOptions}
            />
          </div>

          <ProFormText.Password
            label="登录密码"
            name="Password"
            rules={[
              {
                required: true,
                message: '请输入登录密码',
              },
            ]}
          />

          <div className="col-span-3">
            <ProFormDigit
              label="数量"
              name="InstanceCount"
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

export default function AddHostModalForm({ env }: { env?: API.EnvOption }) {
  const [open, setOpen] = useState(false);
  const [openSameCfgCheck, setOpenSameCfgCheck] = useState(false);
  const [sameBillIndex, setSameBillIndex] = useState(-1);
  const [currentCfgCount, setCurrentCfgCount] = useState(0);
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    if (!open) {
      setBills([]);
    }
  }, [open]);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        添加主机
      </Button>
      <Modal
        open={open}
        title="添加主机"
        width="80%"
        bodyStyle={{
          paddingTop: 12,
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" type="default" onClick={() => setOpen(false)}>
            返回
          </Button>,
          <AddHostSubmitModalForm
            key="add-host-submit"
            bills={bills}
            onFinish={() => setOpen(false)}
          />,
        ]}
      >
        <div className="flex max-h-[calc(100vh-320px)] gap-3">
          <TmpHostTable
            dataSource={bills}
            onCopy={(host) => setBills((prev) => [...prev, host])}
            onRemove={(host) =>
              setBills((prev) => prev.filter((item) => item.uuid !== host.uuid))
            }
          />
          <HostAddForm
            env={env}
            onHostAdd={(host) => {
              const cp1: Bill = { ...host, uuid: '1', InstanceCount: 1 };

              for (let i = 0; i < bills.length; i++) {
                const cp2: Bill = { ...bills[i], uuid: '1', InstanceCount: 1 };
                if (JSON.stringify(cp1) === JSON.stringify(cp2)) {
                  setSameBillIndex(i);
                  setOpenSameCfgCheck(true);
                  setCurrentCfgCount(host.InstanceCount);
                  return;
                }
              }

              setBills((prev) => [...prev, host]);
            }}
          />
        </div>
      </Modal>

      <Modal
        open={openSameCfgCheck}
        onCancel={() => {
          message.info('请调整配置信息！');
          setOpenSameCfgCheck(false);
        }}
        onOk={() => {
          setBills((prev) => [
            ...prev.slice(0, sameBillIndex),
            {
              ...prev[sameBillIndex],
              InstanceCount:
                prev[sameBillIndex].InstanceCount + currentCfgCount,
            },
            ...prev.slice(sameBillIndex + 1),
          ]);
          setOpenSameCfgCheck(false);
        }}
      >
        检测到和第{sameBillIndex + 1}条清单配置完全相同，是否要进行合并？
      </Modal>
    </>
  );
}
