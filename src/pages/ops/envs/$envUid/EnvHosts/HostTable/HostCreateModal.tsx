import { Button, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import HostCreateSubmitModal from './HostCreateSubmitModal';
import HostItemForm, { FormData } from './HostItemForm';
import HostItemTable from './HostItemTable';

export type StagedHost = {
  uuid: string;
  env: API.EnvOption;
  project: API.ProjectOption;
  hostType: API.HostTypeOption;
  ops: API.PersonOption[];
  description: string;
  apps: API.AppOption[];
  count: number;
  cloud: API.CloudOption;
  cloudTags: API.CloudTagOption[];
  cpu: number;
  dataDisks: {
    diskSize: number;
    diskType: string;
  }[];
  diskSize: number;
  diskType: string;
  image: API.ImageOption;
  instanceChargePeriod: number;
  instanceChargeRenewFlag: string;
  instanceChargeType: string;
  instanceType: API.InstanceTypeQuotaItemOption;
  internetMaxBandwidthOut: number;
  memory: number;
  password: string;
  region: API.RegionOption;
  securityGroups: API.SecurityGroupOption[];
  vpcSubnets: { vpc: API.VpcOption; subnetId: string }[];
  zone: API.ZoneOption;
};

export default function HostCreateModal() {
  const [open, setOpen] = useState(false);
  const [hosts, setHosts] = useState<StagedHost[]>([]);
  const [openSameCfgCheck, setOpenSameCfgCheck] = useState(false);
  const [sameBillIndex, setSameBillIndex] = useState(-1);
  const [currentCfgCount, setCurrentCfgCount] = useState(0);
  const [initialFormData, setInitialFormData] = useState<FormData | undefined>(
    undefined,
  );

  const onCopy = (host: StagedHost) => {
    const data: FormData = {
      projectUid: host.project.Uid,
      hostTypeUid: host.hostType.Uid,
      opsUids: host.ops.map((item) => item.Uid),
      description: host.description,
      appUids: host.apps.map((item) => item.Uid),
      count: host.count,
      cloudUid: host.cloud.Uid,
      cloudTagUids: host.cloudTags.map((item) => item.Uid),
      cpu: host.cpu,
      dataDisks: host.dataDisks,
      diskSize: host.diskSize,
      diskType: host.diskType,
      imageUid: host.image.Uid,
      instanceChargePeriod: host.instanceChargePeriod,
      instanceChargeRenewFlag: host.instanceChargeRenewFlag,
      instanceChargeType: host.instanceChargeType,
      instanceTypeUid: host.instanceType.Uid,
      internetMaxBandwidthOut: host.internetMaxBandwidthOut,
      memory: host.memory,
      password: host.password,
      regionUid: host.region.Uid,
      securityGroupUids: host.securityGroups.map((item) => item.Uid),
      vpcSubnetUids: host.vpcSubnets.map((item) => ({
        vpcUid: item.vpc.Uid,
        subnetId: item.subnetId,
      })),
      zoneUid: host.zone.Uid,
    };

    setInitialFormData(data);
  };

  useEffect(() => {
    if (!open) {
      setHosts([]);
    }
  }, [open]);

  const onRemove = (host: StagedHost) => {
    console.log('remove', host);
    setHosts((prev) => prev.filter((item) => item.uuid !== host.uuid));
  };

  const onAddHost = (host: StagedHost) => {
    const cp1: StagedHost = { ...host, uuid: '1', count: 1 };

    for (let i = 0; i < hosts.length; i++) {
      const cp2: StagedHost = { ...hosts[i], uuid: '1', count: 1 };

      if (JSON.stringify(cp1) === JSON.stringify(cp2)) {
        setSameBillIndex(i);
        setOpenSameCfgCheck(true);
        setCurrentCfgCount(host.count);
        return;
      }
    }

    setHosts((prev) => [...prev, host]);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        添加主机
      </Button>
      <Modal
        className="add-host-modal"
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
          <HostCreateSubmitModal
            key="host-create-submit"
            hosts={hosts}
            onFinish={() => setOpen(false)}
          />,
        ]}
      >
        <div className="flex max-h-[calc(100vh-200px)] gap-3">
          <HostItemTable hosts={hosts} onCopy={onCopy} onRemove={onRemove} />
          <HostItemForm initialData={initialFormData} onFinish={onAddHost} />
        </div>
      </Modal>

      <Modal
        open={openSameCfgCheck}
        onCancel={() => {
          message.info('请调整配置信息！');
          setOpenSameCfgCheck(false);
        }}
        onOk={() => {
          setHosts((prev) => [
            ...prev.slice(0, sameBillIndex),
            {
              ...prev[sameBillIndex],
              count: prev[sameBillIndex].count + currentCfgCount,
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
