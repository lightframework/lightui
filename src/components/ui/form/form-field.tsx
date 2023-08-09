import {
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { ComponentProps, JSXElementConstructor } from 'react';

type FilteredProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
> = Omit<ComponentProps<T>, 'name'>;

export type FormField<FormData extends Record<string, any>> = (
  | (FilteredProps<typeof ProFormText> & {
      fieldType: 'text';
    })
  | (FilteredProps<typeof ProFormText.Password> & {
      fieldType: 'password';
    })
  | (FilteredProps<typeof ProFormTextArea> & {
      fieldType: 'textarea';
    })
  | (FilteredProps<typeof ProFormSelect> & {
      fieldType: 'select';
    })
  | (FilteredProps<typeof ProFormRadio.Group> & {
      fieldType: 'radio';
    })
) & {
  name: keyof FormData;
  required?: boolean;
};

export type FormFields<T extends Record<string, any>> = FormField<T>[];

export function renderFormField<T extends Record<string, any>>(
  field: FormField<T>,
) {
  switch (field.fieldType) {
    case 'text': {
      return (
        <ProFormText
          {...field}
          name={field.name}
          label={field.label}
          key={field.name as string}
          placeholder=""
          rules={[
            {
              ...field.rules,
              required: field.required,
              message: `请输入${field.label}`,
            },
          ]}
        />
      );
    }
    case 'password': {
      return (
        <ProFormText.Password
          {...field}
          name={field.name}
          label={field.label}
          key={field.name as string}
          placeholder=""
          rules={[
            ...(field.rules ?? []),
            {
              required: field.required,
              message: `请输入${field.label}`,
            },
          ]}
        />
      );
    }
    case 'textarea': {
      return (
        <ProFormTextArea
          {...field}
          name={field.name}
          label={field.label}
          key={field.name as string}
          placeholder=""
          rules={[
            {
              ...field.rules,
              required: field.required,
              message: `请输入${field.label}`,
            },
          ]}
        />
      );
    }
    case 'select': {
      return (
        <ProFormSelect
          {...field}
          name={field.name}
          label={field.label}
          key={field.name as string}
          placeholder=""
          mode="multiple"
          allowClear
          rules={[
            {
              ...field.rules,
              required: field.required,
              message: `请输入${field.label}`,
            },
          ]}
        />
      );
    }
    case 'radio': {
      return (
        <ProFormRadio.Group
          {...field}
          name={field.name}
          label={field.label}
          key={field.name as string}
          placeholder=""
          rules={[
            {
              ...field.rules,
              required: field.required,
              message: `请输入${field.label}`,
            },
          ]}
        />
      );
    }
    default: {
      return undefined;
    }
  }
}

export function renderFormFields<T extends Record<string, any>>(
  fields: FormFields<T>,
) {
  return fields.map((field) => renderFormField(field));
}
