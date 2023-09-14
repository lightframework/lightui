export const instanceChargeTypeDict: Record<string, string> = {
  PREPAID: '包年包月',
  POSTPAID_BY_HOUR: 'POSTPAID_BY_HOUR',
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
