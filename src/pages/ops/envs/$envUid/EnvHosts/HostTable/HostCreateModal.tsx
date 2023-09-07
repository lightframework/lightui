import { Button, Form, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import HostCreateSubmitModal from './HostCreateSubmitModal';
import HostItemForm from './HostItemForm';
import HostItemTable from './HostItemTable';

export type StagedHost = {
  uuid: string;
  envId: string;
  project: string;
  hostType: string;
  opsUids: string[];
  description: string;
  appUids: string[];
  count: number;
  cloud: string;
  cloudTagUids: string[];
  cpu: number;
  dataDisks: {
    diskSize: number;
    diskType: string;
  }[];
  diskSize: number;
  diskType: string;
  imageId: string;
  instanceChargePeriod: number;
  instanceChargeRenewFlag: string;
  instanceChargeType: string;
  instanceType: string;
  internetMaxBandwidthOut: number;
  memory: number;
  password: string;
  region: string;
  securityGroupIds: string[];
  vpcSubnetIds: { vpcId: string; subnetId: string }[];
  zone: string;
};

function generateEmptyHost(): StagedHost {
  return {
    uuid: uuidV4(),
    envId: '',
    project: '',
    hostType: '',
    opsUids: [],
    description: '',
    appUids: [],
    count: 1,
    cloud: '',
    cloudTagUids: [],
    cpu: 2,
    dataDisks: [],
    diskSize: 50,
    diskType: 'CLOUD_SSD',
    imageId: '',
    instanceChargePeriod: 1,
    instanceChargeRenewFlag: 'NOTIFY_AND_MANUAL_RENEW',
    instanceChargeType: 'POSTPAID_BY_HOUR',
    instanceType: '',
    internetMaxBandwidthOut: 50,
    memory: 4,
    password: '',
    region: '',
    securityGroupIds: [],
    vpcSubnetIds: [],
    zone: '',
  };
}

export default function HostCreateModal() {
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [hosts, setHosts] = useState<StagedHost[]>([]);
  const [selectedHost, setSelectedHost] = useState<StagedHost | undefined>(
    undefined,
  );
  const [form] = Form.useForm<StagedHost>();

  useEffect(() => {
    if (!open) {
      setHosts([]);
      setSelectedHost(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (selectedHost) {
      setIsEdit(true);
      form.setFieldsValue(selectedHost);
    } else {
      setIsEdit(false);
    }
  }, [selectedHost]);

  const finishEdit = (host: StagedHost) => {
    if (isEdit) {
      const hostIndex = hosts.findIndex((item) => item.uuid === host.uuid);

      if (hostIndex !== -1) {
        setHosts((hosts) => [
          ...hosts.slice(0, hostIndex),
          { ...host },
          ...hosts.slice(hostIndex + 1),
        ]);
        setIsEdit(false);
        message.success('配置成功');
      }
    }
  };

  const onHostAdd = async () => {
    const host = generateEmptyHost();

    if (isEdit) {
      try {
        const values = await form.validateFields();
        finishEdit(values);
      } catch (e) {
        message.error('请先完成主机配置！');
        return;
      }
    }

    setHosts((hosts) => [...hosts, host]);
    setSelectedHost(host);
  };

  const onCopy = async (host: StagedHost) => {
    if (isEdit) {
      try {
        const values = await form.validateFields();
        finishEdit(values);
      } catch (e) {
        message.error('请先完成主机配置！');
        return;
      }
    }

    const newHost: StagedHost = { ...host, uuid: uuidV4() };
    console.log('new host', newHost);
    setHosts((hosts) => [...hosts, newHost]);
    setSelectedHost(newHost);
  };

  const onRemove = (host: StagedHost) => {
    const hostIndex = hosts.findIndex((item) => item.uuid === host.uuid);

    if (hostIndex !== -1) {
      if (hostIndex !== 0) {
        setSelectedHost(hosts[0]);
      } else {
        if (hosts.length === 1) {
          setSelectedHost(undefined);
        } else {
          setSelectedHost(hosts[1]);
        }
      }

      setHosts((hosts) => [
        ...hosts.slice(0, hostIndex),
        ...hosts.slice(hostIndex + 1),
      ]);

      message.info('删除成功');
    }
  };

  const onRowClick = async (host: StagedHost) => {
    if (isEdit) {
      try {
        const values = await form.validateFields();
        finishEdit(values);
      } catch (e) {
        message.error('请先完成主机配置！');
        return;
      }
    }

    setSelectedHost(host);
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
          isEdit ? (
            <Button
              type="primary"
              onClick={async () => {
                try {
                  const values = await form.validateFields();
                  finishEdit(values);
                } catch (e) {
                  message.error('请先完成主机配置！');
                  return;
                }
              }}
            >
              保存
            </Button>
          ) : (
            <HostCreateSubmitModal
              key="host-create-submit"
              hosts={hosts}
              onFinish={() => setOpen(false)}
            />
          ),
        ]}
      >
        <div className="flex max-h-[calc(100vh-200px)] gap-3">
          <HostItemTable
            selectedHostUuid={selectedHost?.uuid}
            onHostAdd={onHostAdd}
            hosts={hosts}
            onCopy={onCopy}
            onRemove={onRemove}
            onRowClick={onRowClick}
          />
          {selectedHost ? (
            <HostItemForm form={form} />
          ) : (
            <p className="w-full py-6 text-center text-base">请先创建主机</p>
          )}
        </div>
      </Modal>
    </>
  );
}
