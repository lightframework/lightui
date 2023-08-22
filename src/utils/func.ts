export function toLocaleDateTimeString(str?: string) {
  if (!str) return;

  return new Date(str).toLocaleString().replaceAll('/', '-');
}

export function generateOptions<DataType extends Record<string, any>>(
  data: { list?: DataType[] } | undefined,
  config: {
    valueKey: keyof DataType;
    labelKey: keyof DataType;
  },
): { label: string; value: string }[] {
  if (!data?.list) {
    return [];
  }

  return data.list.map((item) => ({
    label: item[config.labelKey],
    value: item[config.valueKey],
  }));
}
