import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { useCloud } from '@/lib/hooks/data';
import { cityOptionsApiCmdbCitysOptions } from '@/services/cmdb/city';
import {
  continentCreateApiCmdbContinents,
  continentOptionsApiCmdbContinentsOptions,
} from '@/services/cmdb/continent';
import { countryOptionsApiCmdbCountrysOptions } from '@/services/cmdb/country';
import { PlusCircleOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormCascader,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { useAccess, useParams } from '@umijs/max';
import { Button, Tooltip, message } from 'antd';
import { useEffect, useState } from 'react';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
  type: 'continent' | 'country' | 'city';
}

function CitySelect() {
  const [options, setOptions] = useState<Option[]>([]);

  const { data } = useQuery({
    queryKey: ['continent-options'],
    queryFn: () =>
      continentOptionsApiCmdbContinentsOptions({}).then(
        (res) => res.data?.list ?? [],
      ),
  });

  useEffect(() => {
    if (data) {
      setOptions(
        data.map((continent) => ({
          label: continent.ContinentNameCn,
          value: continent.Uid,
          isLeaf: false,
          type: 'continent',
        })),
      );
    }
  }, [data]);

  const loadData = async (selectedOptions: Option[]) => {
    const promises: Promise<void>[] = [];

    for (const option of selectedOptions) {
      if (option.type === 'continent') {
        const promise = countryOptionsApiCmdbCountrysOptions({
          ContinentUid: option.value,
        }).then((res) => {
          option.children = res.data?.list?.map((country) => ({
            label: country.CountryNameCn,
            value: country.Uid,
            isLeaf: false,
            type: 'country',
          }));
        });
        promises.push(promise);
      } else if (option.type === 'country') {
        const promise = cityOptionsApiCmdbCitysOptions({
          CountryUid: option.value,
        }).then((res) => {
          option.children = res.data?.list?.map((city) => ({
            label: city.CityName,
            value: city.Uid,
            isLeaf: true,
            type: 'city',
          }));
        });
        promises.push(promise);
      }
    }

    await Promise.all(promises);

    setOptions([...options]);
  };

  return (
    <ProFormCascader
      name="CityUid"
      label="城市"
      fieldProps={{ options, loadData }}
    />
  );
}

export default function RegionCreateModalForm({
  onFinish,
}: {
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  const { cloudUid } = useParams();

  const { data: cloud } = useCloud(cloudUid!);

  return (
    <ModalForm<CMDB.RegionCreateReq>
      title="添加区域"
      name="region-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Tooltip
          title={cloud?.SupportApi ? '该云商不支持手动添加区域' : '添加区域'}
        >
          <Button
            type="text"
            shape="circle"
            icon={<PlusCircleOutlined />}
            disabled={!access.RegionCreateApiCmdbRegions || cloud?.SupportApi}
          />
        </Tooltip>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await continentCreateApiCmdbContinents(formData);
        message.success('添加成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText
        label="区域ID"
        name="Region"
        placeholder=""
        rules={[{ required: true, message: '请输入区域ID' }]}
      />
      <ProFormText
        label="区域名称"
        name="RegionName"
        placeholder=""
        rules={[{ required: true, message: '请输入名称' }]}
      />
      <CitySelect />
      <ProFormSwitch label="可用状态" name="RegionState" initialValue={false} />
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
