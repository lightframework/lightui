import type {
  DatePickerProps,
  FormItemProps,
  FormProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  TimePickerProps,
} from 'antd';

import type { FormInstance } from 'antd/lib/form';
import React from 'react';

export interface BaseItemProps<Value> {
  value: Value;
  onChange: (v: Value) => void;
}

export type LightOption = {
  value: any;
  label: string;
};

export type AllChildrenProps =
  | (BaseItemProps & Record<any, any>)
  | InputProps
  | InputNumberProps
  | SelectProps
  | RadioGroupProps
  | RadioProps
  | DatePickerProps
  | TimePickerProps;

type ItemRender = <T>(values: T, form: FormInstance) => React.ReactNode;

export interface LightFormColumn<Values, childrenProps = BaseItemProps & Record<any, any>>
  extends FormItemProps<Values> {
  key?: React.Key;
  itemChildren?: React.ReactElement<childrenProps> | ItemRender<Values>;
}

export interface LightModalFormProps<Values>
  extends Omit<FormProps<Values>, 'onFinish' | 'onFinishFailed'> {
  open: boolean;
  onCancel: (open: boolean) => void;
  width?: number;
  title?: string;
  request?: (values: Values) => Promise<void>;
  modalStyle?: React.CSSProperties;
  successMsg?: string;
  failedMsg?: string;
  okText?: string;
  columns?: LightFormColumn[];
}

function LightModalForm<DataType extends Record<string, any>>(
  props: LightModalFormProps<DataType>,
): JSX.Element;

export default LightModalForm;
