// @ts-ignore
import { DoubleRightOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';

import type { FormInstance, FormItemProps, FormProps, TimeRangePickerProps } from 'antd';
// import moment from 'moment';
import { isBrowser, useMountMergeState } from '@ant-design/pro-utils';
import RcResizeObserver from 'rc-resize-observer';
// @ts-ignore
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './index.less';

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
  listen?: boolean;
  itemWidth: number;
  options?: QueryOption[];
  formItemProps?: FormItemProps;
  mode?: 'multiple' | 'tags';
  disabled?: boolean;
  refreshClick?: () => void;
};

type QueryHeaderProps = {
  columns: QueryColumn[];
  buttonRender: () => React.ReactElement[];
  width?: number;
  refreshCallBack?: () => void;
  formRef?: React.Ref<FormInstance<any>> | null;
} & FormProps;

const defaultWidth = isBrowser() ? document?.body?.clientWidth : 1024;

const QueryHeader: React.FC<QueryHeaderProps> = (props) => {
  const { columns, style, width, refreshCallBack, formRef, buttonRender, ...rest } = props;
  const [form] = Form.useForm();

  const TotalColumns = columns.length;

  const [fold, setFold] = useState<boolean>(true);
  const [boxWidth, setBoxWidth] = useMountMergeState(
    () => (typeof style?.width === 'number' ? style?.width : defaultWidth) as number,
  );
  const [breakPoint, setBreakPoint] = useState<number>();
  const [buttonBoxWith, setButtonBoxWith] = useState<number>(0);

  // const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  //   // Can not select days before today and today
  //   return current && current < moment().subtract(3, 'weeks');
  // };

  const calculateBreakPoint = () => {
    const usefulTotalWidth = boxWidth - buttonBoxWith - 42;
    let totalSize = 0;
    const length = columns.length;
    for (let i = 0; i < length; i++) {
      const column = columns[i];
      const { itemWidth } = column;
      totalSize += itemWidth + 10;
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
              <Radio.Group
                onChange={() => {
                  form?.submit();
                }}
              >
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
                prefix={<SearchOutlined />}
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
        console.log(options);
        return (
          <div style={{ width: itemWidth }} key={name}>
            <Form.Item label={label} name={name} {...formItemProps} className={styles.item}>
              <Select
                mode={mode}
                options={options}
                allowClear={allowClear}
                onChange={() => {
                  form?.submit();
                }}
              />
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
              <DatePicker.RangePicker
                showTime={showTime}
                disabled={disabled}
                disabledDate={disabledDate}
                allowClear={allowClear}
              />
            </Form.Item>
          </div>
        );
      }
    });
  };

  const buttons = (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setButtonBoxWith(offset.width);
      }}
    >
      <div className={styles.buttons}>
        <div
          style={{
            backgroundColor: fold ? undefined : 'rgb(83, 238, 230, 0.1)',
            display: breakPoint && breakPoint < TotalColumns ? undefined : 'none',
          }}
          className={styles.foldButton}
          onClick={() => {
            setFold(!fold);
          }}
        >
          <DoubleRightOutlined
            rotate={fold ? 0 : 90}
            className={styles.colIcon}
            style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
          />
        </div>

        {buttonRender?.()}
      </div>
    </RcResizeObserver>
  );

  useEffect(() => {
    calculateBreakPoint();
  }, [boxWidth, buttonBoxWith]);

  // const submit = (e: KeyboardEvent) => {
  //   if (e.code === 'Enter') {
  //     console.log(55555);
  //     form?.submit();
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('keydown', submit);
  //   return () => {
  //     document.removeEventListener('keydown', submit);
  //   };
  // }, []);

  return (
    <div>
      <Form
        {...rest}
        form={form}
        ref={formRef}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
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
              <div className={styles.items}>
                <Button
                  type="default"
                  style={{ transform: 'rotate(-90deg)' }}
                  icon={<RedoOutlined />}
                  onClick={() => {
                    refreshCallBack?.();
                    form?.submit();
                  }}
                />
                {generateItems(columns.slice(0, breakPoint))}
              </div>

              {buttons}
            </div>

            {!fold && breakPoint && breakPoint < columns.length && (
              <div className={styles.box2}>
                {generateItems(columns.slice(breakPoint, columns.length))}
              </div>
            )}
          </div>
        </RcResizeObserver>
      </Form>
    </div>
  );
};

export default QueryHeader;
