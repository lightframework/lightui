import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd/es/auto-complete';
import classNames from 'classnames';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React, { useRef } from 'react';
import styles from './index.less'


import {createUseStyles}  from 'react-jss'
// import v4token from '@/../v4token'

// .headerSearch {
//   display: inline-flex;
//   align-items: center;
//   .input {
//     width: 0;
//     min-width: 0;
//     overflow: hidden;
//     background: transparent;
//     border-radius: 0;
//     transition: width 0.3s, margin-left 0.3s;
//     :global(.ant-select-selection) {
//       background: transparent;
//     }
//     input {
//       box-shadow: none !important;
//     }

//     &.show {
//       width: 210px;
//       margin-left: 8px;
//     }
//   }
// }

 
const useStyle = createUseStyles({
  headerSearch: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  input: {
    width: 0,
    minWith: 0,
    overflow: 'hidden',
    background: 'transparent',
    borderRadius: 0

  },
  show: {

  }

})

export type HeaderSearchProps = {
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onVisibleChange?: (b: boolean) => void;
  className?: string;
  placeholder?: string;
  options: AutoCompleteProps['options'];
  defaultVisible?: boolean;
  visible?: boolean;
  defaultValue?: string;
  value?: string;
};

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const {
    className,
    defaultValue,
    onVisibleChange,
    placeholder,
    visible,
    defaultVisible,
    ...restProps
  } = props;

  const inputRef = useRef<InputRef | null>(null);

  const [value, setValue] = useMergedState<string | undefined>(defaultValue, {
    value: props.value,
    onChange: props.onChange,
  });

  const [searchMode, setSearchMode] = useMergedState(defaultVisible ?? false, {
    value: props.visible,
    onChange: onVisibleChange,
  });

  const classes = useStyle()

  const inputClass = classNames(classes.input, {
    [classes.show]: searchMode,
  });
  return (
    <div
      className={classNames(className, styles.headerSearch)}
      onClick={() => {
        setSearchMode(true);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onVisibleChange) {
            onVisibleChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
        }}
      />
      <AutoComplete
        key="AutoComplete"
        className={inputClass}
        value={value}
        options={restProps.options}
        onChange={(completeValue) => setValue(completeValue)}
      >
        <Input
          size="small"
          ref={inputRef}
          defaultValue={defaultValue}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (restProps.onSearch) {
                restProps.onSearch(value);
              }
            }
          }}
          onBlur={() => {
            setSearchMode(false);
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
