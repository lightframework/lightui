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

export interface LightModalFormProps<Values, Resp>
  extends Omit<FormProps<Values>, 'onFinish' | 'onFinishFailed'> {
  open: boolean;
  onCancel: (open: boolean) => void;
  onSuccess?: () => void;
  onFailed?: (e: Error | null) => void;
  width?: number | string;
  title?: string;
  messageRender?: (r: Resp) => void;
  request?: (values: Values) => Promise<Resp>;
  modalStyle?: React.CSSProperties;
  successMsg?: string;
  failedMsg?: string;
  okText?: string;
  columns?: LightFormColumn[];
}

type BaseResp = {
  code: number;
  msg: string;
  success: boolean;
};

function LightModalForm<DataType extends Record<string, any>, Resp extends { resp: BaseResp }>(
  props: LightModalFormProps<DataType, Resp>,
): JSX.Element;

export default LightModalForm;
