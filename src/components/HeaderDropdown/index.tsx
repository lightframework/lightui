import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import React from 'react';
import {createUseStyles}  from 'react-jss'
import {convertLegacyToken} from '@ant-design/compatible/es'

 
const useStyle = createUseStyles({
  container: {
    '& >*': {
      backgroundColor: convertLegacyToken["popover-bg"],
      borderRadius: 4,
      boxShadow:convertLegacyToken["shadow-1-down"]
    },
  [`@media screen and (max-width: ${convertLegacyToken["screen-xs"]})`]: {
    container: {
      width: '100% !important',
      borderRadius: '0 !important',
    }
  }
  }
})



export type HeaderDropdownProps = {
  overlayClassName?: string;
  overlay: React.ReactNode | (() => React.ReactNode) | any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {

  const classes = useStyle()

  return (<Dropdown
    overlayClassName={classNames(classes.container)}
    getPopupContainer={(target) => target.parentElement || document.body}
    {...restProps}
  />
);

}
  
  
  

export default HeaderDropdown;
