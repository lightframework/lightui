// @ts-ignore
import React, { useState, useEffect } from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Form, Input, Button, Radio, Space, Select, DatePicker, InputNumber } from 'antd';

import type { FormItemProps, FormProps, TimeRangePickerProps, FormInstance } from 'antd';
// import moment from 'moment';
import RcResizeObserver from 'rc-resize-observer';
import { isBrowser, useMountMergeState } from '@ant-design/pro-utils';
// @ts-ignore
import styles from './index.less';
import locale from 'antd/lib/locale/zh_CN';

const RangePicker_: any = DatePicker.RangePicker;
export type QueryOption = {
  value: any;
  label: string;
};
export type QueryColumn = {
  type: 'radioButton' | 'text' | 'select' | 'dateTimeRange' | 'number';
  label?: string | null;
  placeholder?: string;
  name: string;
  allowClear?: boolean;
  disabledDate?: TimeRangePickerProps['disabledDate'];
  defaultValue?: any;
  showTime?: boolean;
  leisten?: boolean;
  itemWidth: number;
  options?: QueryOption[];
  formItemProps?: FormItemProps;
  mode?: 'multiple' | 'tags';
  disabled?: boolean;
};

type QueryHeaderProps = {
  columns: QueryColumn[];
  width?: number;
  onResetCallBack?: () => void;
  formRef?: React.Ref<FormInstance<any>> | null;
} & FormProps;

const defaultWidth = isBrowser() ? document?.body?.clientWidth : 1024;

const QueryHeader: React.FC<QueryHeaderProps> = (props) => {
  const { columns, style, width, onResetCallBack, formRef, ...rest } = props;
  const [form] = Form.useForm();

  const TotalColumns = columns.length;

  const [fold, setFold] = useState<boolean>(true);
  const [boxWidth, setBoxWidth] = useMountMergeState(
    () => (typeof style?.width === 'number' ? style?.width : defaultWidth) as number,
  );
  const [breakPoint, setBreakPoint] = useState<number>();

  // const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  //   // Can not select days before today and today
  //   return current && current < moment().subtract(3, 'weeks');
  // };

  const calculateBreakPoint = () => {
    const usefulTotalWidth = boxWidth - 290;
    let totalSize = 0;
    const length = columns.length;
    for (let i = 0; i < length; i++) {
      const column = columns[i];
      const { itemWidth } = column;
      totalSize += itemWidth + 20;
      if (totalSize > usefulTotalWidth) {
        if (i === 0) {
          setBreakPoint(i + 1);
        } else {
          setBreakPoint(i);
        }
        return;
      }
    }
    setBreakPoint(length);
  };

  const generateItems = (cols: QueryColumn[]) => {
    return cols.map((col) => {
      const {
        type,
        label,
        name,
        allowClear,
        itemWidth,
        defaultValue,
        disabledDate,
        options,
        placeholder,
        formItemProps,
        disabled,
        mode,
        showTime,
      } = col;
      if (type == 'radioButton') {
        return (
          <div style={{ width: itemWidth }} key={name}>
            <Form.Item
              label={label}
              name={name}
              {...formItemProps}
              initialValue={defaultValue}
              className={styles.item}
            >
              <Radio.Group>
                {options?.map((option) => (
                  <Radio.Button value={option.value} key={option.value}>
                    {option.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
        );
      }
      if (type == 'text') {
        return (
          <div style={{ width: itemWidth }} key={name}>
            <Form.Item label={label} name={name} {...formItemProps} className={styles.item}>
              <Input
                placeholder={placeholder}
                className={styles.input}
                onPressEnter={form.submit}
              />
            </Form.Item>
          </div>
        );
      }
      if (type == 'number') {
        return (
          <div style={{ width: itemWidth }} key={name}>
            <Form.Item
              label={label}
              name={name}
              {...formItemProps}
              className={styles.item}
              initialValue={defaultValue}
            >
              <InputNumber
                placeholder={placeholder}
                className={styles.input}
                onPressEnter={form.submit}
              />
            </Form.Item>
          </div>
        );
      }
      if (type == 'select') {
        return (
          <div style={{ width: itemWidth }} key={name}>
            <Form.Item label={label} name={name} {...formItemProps} className={styles.item}>
              <Select mode={mode} options={options} allowClear={allowClear} />
            </Form.Item>
          </div>
        );
      }
      if (type == 'dateTimeRange') {
        return (
          <div style={{ width: itemWidth }} key={name}>
            <Form.Item
              label={label}
              name={name}
              {...formItemProps}
              className={styles.item}
              initialValue={defaultValue}
            >
              <RangePicker_
                showTime={showTime}
                disabled={disabled}
                disabledDate={disabledDate}
                allowClear={allowClear}
                locale={locale}
              />
            </Form.Item>
          </div>
        );
      }
    });
  };

  const buttons = (
    <Space
      size={[15, 10]}
      wrap={false}
      direction="horizontal"
      align="center"
      className={styles.buttons}
    >
      <Button
        type="ghost"
        onClick={() => {
          setFold(!fold);
        }}
        hidden={!(breakPoint && breakPoint < TotalColumns)}
        style={{
          backgroundColor: fold ? undefined : 'rgb(83, 238, 230, 0.1)',
          marginLeft: 20,
        }}
        icon={<DoubleRightOutlined rotate={fold ? 0 : 90} className={styles.colIcon} />}
      />

      <Button
        type="primary"
        onClick={() => {
          form.submit();
        }}
      >
        查询
      </Button>
      <Button
        type="primary"
        onClick={() => {
          form.resetFields();
          onResetCallBack?.();
        }}
      >
        重置
      </Button>
    </Space>
  );

  useEffect(() => {
    calculateBreakPoint();
  }, [boxWidth]);

  return (
    <div>
      <Form {...rest} form={form} ref={formRef}>
        <RcResizeObserver
          key="resize-observer"
          onResize={(offset) => {
            if (width !== offset.width && offset.width > 17) {
              setBoxWidth(offset.width);
            }
          }}
        >
          <div className={styles.box}>
            <div className={styles.box1}>
              <div>
                <Space size={[20, 10]} wrap={false} direction="horizontal" align="center">
                  {generateItems(columns.slice(0, breakPoint))}
                </Space>
              </div>

              {buttons}
            </div>

            {!fold && breakPoint && breakPoint < columns.length && (
              <div className={styles.box2}>
                <Space size={[20, 10]} wrap={true} direction="horizontal" align="center">
                  {generateItems(columns.slice(breakPoint, columns.length))}
                </Space>
              </div>
            )}
          </div>
        </RcResizeObserver>
      </Form>
    </div>
  );
};

export default QueryHeader;
