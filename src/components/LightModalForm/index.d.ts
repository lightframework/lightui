import type { FormItemProps, FormProps } from 'antd';
import React from 'react';

export interface ItemChildrenProps<Value> {
  value: Value;
  onChange: (v: Value) => void;
}

export interface LightFormColumn<Values, childrenProps = ItemChildrenProps & Record<any, any>>
  extends FormItemProps<Values> {
  columnRender?: () => React.ReactElement<childrenProps>;
}

export interface LightModalFormProps<Values>
  extends Omit<FormProps<Values>, 'onFinish' | 'onFinishFailed'> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  width?: number;
  title?: string;
  request: (values: Values) => Promise<void>;
  modalStyle?: React.CSSProperties;
  successMsg?: string;
  failedMsg?: string;
  okText?: string;
  columns?: LightFormColumn[];
}

function LightModalForm<DataType extends Record<string, any>>(
  props: LightModalProps<DataType>,
): JSX.Element;

export default LightModalForm;
