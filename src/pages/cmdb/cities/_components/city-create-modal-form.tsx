import { MODAL_FORM_WIDTH } from '@/constants/modal';
import { CityCreateApiCmdbCitys } from '@/services/cmdb/city';
import { continentOptionsApiCmdbContinentsOptions } from '@/services/cmdb/continent';
import { countryOptionsApiCmdbCountrysOptions } from '@/services/cmdb/country';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormCascader,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { useAccess } from '@umijs/max';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
}

function CountrySelect() {
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
        })),
      );
    }
  }, [data]);

  const loadData = async (selectedOptions: Option[]) => {
    const promises: Promise<void>[] = [];

    for (const option of selectedOptions) {
      const promise = countryOptionsApiCmdbCountrysOptions({
        ContinentUid: option.value,
      }).then((res) => {
        option.children = res.data?.list?.map((country) => ({
          label: country.CountryNameCn,
          value: country.Uid,
          isLeaf: true,
        }));
      });
      promises.push(promise);
    }

    await Promise.all(promises);

    setOptions([...options]);
  };

  return (
    <ProFormCascader
      name="CountryUid"
      label="所属地区"
      fieldProps={{ options, loadData }}
      placeholder=""
      rules={[{ required: true, message: '请选择所属地区' }]}
      transform={(value) => (Array.isArray(value) ? value.at(1) : value)}
    />
  );
}

export default function CityCreateModalForm({
  countryUid,
  onFinish,
}: {
  countryUid?: string;
  onFinish?: VoidFunction;
}) {
  const access = useAccess();
  return (
    <ModalForm<CMDB.CityCreateReq>
      title="添加城市"
      name="city-create"
      width={MODAL_FORM_WIDTH}
      trigger={
        <Button type="primary" disabled={!access.CityCreateApiCmdbCitys}>
          <PlusOutlined />
          添加
        </Button>
      }
      autoFocusFirstInput
      layout="horizontal"
      modalProps={{
        destroyOnClose: true,
      }}
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        await CityCreateApiCmdbCitys(formData);
        message.success('添加成功');
        onFinish?.();
        return true;
      }}
    >
      <ProFormText
        label="ID"
        name="CityId"
        placeholder=""
        rules={[
          { required: true, message: '请输入城市ID（无空白和特殊字符）' },
          {
            pattern: /^[a-zA-Z0-9]*$/,
            message: '城市ID不包含空白和特殊字符',
          },
        ]}
      />
      <ProFormText
        label="名称"
        name="CityName"
        placeholder=""
        rules={[{ required: true, message: '请输入城市名称' }]}
      />
      <ProFormText
        label="中文名称"
        name="CityNameCn"
        placeholder=""
        rules={[{ required: true, message: '请输入城市中文名称' }]}
      />
      {countryUid ? (
        <ProFormText name="CountryUid" initialValue={countryUid} hidden />
      ) : (
        <CountrySelect />
      )}
      <ProFormTextArea label="备注" name="Description" placeholder="" />
    </ModalForm>
  );
}
