export const instanceChargeTypeDict: Record<string, string> = {
  PREPAID: '包年包月',
  POSTPAID_BY_HOUR: '按时付费',
};

export const diskTypeDict: Record<string, string> = {
  CLOUD_SSD: 'SSD云硬盘',
  CLOUD_PREMIUM: '高性能云硬盘',
};

export const renewFlagDict: Record<string, string> = {
  NOTIFY_AND_AUTO_RENEW: '通知过期且自动续费',
  NOTIFY_AND_MANUAL_RENEW: '通知过期不自动续费',
  DISABLE_NOTIFY_AND_MANUAL_RENEW: '不通知过期不自动续费',
};

export const taskStatusDict: Record<string, string> = {
  Pending: '待执行',
  InProgress: '正在执行',
  Success: '成功',
  Failed: '失败',
};

export const taskTypeDict: Record<string, string> = {
  CreateHost: '创建主机',
  DestroyHost: '销毁主机',
};

export const stateColorDict: Record<string, string> = {
  待创建: '#ffa940',
  待完善: '#fffbe6',
  待更新: '#fcffe6',
  PENDING: '#e6fffb',
  待销毁: '#e6f4ff',
  已销毁: '#fff1f0',
  RUNNING: '#f6ffed',
};

export const stateBorderColorDict: Record<string, string> = {
  待创建: '#ffa940',
  待完善: '#ffc53d',
  待更新: '#9254de',
  PENDING: '#36cfc9',
  待销毁: '#4096ff',
  已销毁: '#ff4d4f',
  RUNNING: '#73d13d',
};

export const subTaskStatusDict: Record<
  string,
  { value: string; bgColor: string; borderColor: string }
> = {
  Compleated: {
    value: 'Compleated',
    bgColor: '#f6ffed',
    borderColor: '#73d13d',
  },
  Failed: {
    value: 'Failed',
    bgColor: '#fff1f0',
    borderColor: '#ff4d4f',
  },

  Initial: {
    value: 'Initial',
    bgColor: '#fff2e8',
    borderColor: '#ffa940',
  },
  Pending: {
    value: 'Pending',
    bgColor: '#e6fffb',
    borderColor: '#36cfc9',
  },
};
