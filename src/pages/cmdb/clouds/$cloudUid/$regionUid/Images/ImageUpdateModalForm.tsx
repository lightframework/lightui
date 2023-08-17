import ModalUpdateForm from '@/components/ui/form/modal-form/ModalUpdateForm';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

type ImageUpdateReq = {
  ImageId: string;
  ImageName: string;
  ImageType?: string;
  Architecture?: string;
  Platform?: string;
  OsName?: string;
  Tags?: string;
  RegionUid: string;
};

type ImageUpdateParams = {
  imageUid: string;
};

type ImageReadOneParams = {
  imageUid: string;
};

export default function ImageUpdateModalForm({
  imageUid,
  regionUid,
  onFinish,
}: {
  imageUid: string;
  regionUid: string;
  onFinish?: VoidFunction;
}) {
  return (
    <ModalUpdateForm<ImageUpdateReq, ImageUpdateParams, ImageReadOneParams>
      title="创建镜像"
      width={512}
      onFinish={onFinish}
      initialParams={{ imageUid }}
      initialRequest={async () => {
        return {
          msg: 'OK',
          code: 2000,
          data: {
            ImageId: 'eqweq',
            ImageName: 'centos7-amd',
            ImageType: '操作系统',
            Architecture: 'amd',
            Platform: 'TencentOS',
            OsName: 'centos7',
            Tags: 'orch',
          },
        };
      }}
      requestParams={{ imageUid }}
      request={async () => {
        return { msg: '暂未实现', code: 5000 };
      }}
    >
      <ProFormText name="RegionUid" initialValue={regionUid} hidden />
      <ProForm.Group>
        <ProFormText
          label="镜像Id"
          name="ImageId"
          placeholder=""
          width="sm"
          rules={[
            {
              required: true,
              message: '请输入镜像Id',
            },
          ]}
        />
        <ProFormText
          label="镜像名称"
          name="ImageName"
          placeholder=""
          width="sm"
          rules={[
            {
              required: true,
              message: '请输入镜像名称',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label="镜像类型"
          name="ImageType"
          placeholder=""
          width="sm"
          options={[
            {
              label: '操作系统',
              value: '操作系统',
            },
          ]}
          rules={[
            {
              required: true,
              message: '请选择镜像类型',
            },
          ]}
        />
        <ProFormSelect
          label="镜像架构"
          name="Architecture"
          placeholder=""
          width="sm"
          options={[
            {
              label: 'amd',
              value: 'amd',
            },
            {
              label: 'arm',
              value: 'arm',
            },
          ]}
          rules={[
            {
              required: true,
              message: '请选择镜像架构',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label="镜像平台"
          name="Platform"
          placeholder=""
          width="sm"
          options={[
            {
              label: 'TencentOS',
              value: 'TencentOS',
            },
            {
              label: 'AliOS',
              value: 'AliOS',
            },
          ]}
          rules={[
            {
              required: true,
              message: '请选择镜像平台',
            },
          ]}
        />
        <ProFormSelect
          label="系统"
          name="OsName"
          placeholder=""
          width="sm"
          options={[
            {
              label: 'centos7',
              value: 'centos7',
            },
            {
              label: 'ubuntu22',
              value: 'ubuntu22',
            },
          ]}
          rules={[
            {
              required: true,
              message: '请选择系统',
            },
          ]}
        />
      </ProForm.Group>

      <ProFormText label="标签" name="Tags" placeholder="" />
    </ModalUpdateForm>
  );
}
