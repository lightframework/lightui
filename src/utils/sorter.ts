type ValueType = 'string' | 'dateTime';

export function sorter<DataType extends Record<string, any>>(
  a: DataType,
  b: DataType,
  key: keyof DataType,
  options: {
    valueType: ValueType;
  } = {
    valueType: 'string',
  },
) {
  switch (typeof a[key]) {
    case 'string': {
      if (options.valueType === 'dateTime') {
        const aValue = new Date(a[key]).getTime();
        const bValue = new Date(b[key]).getTime();
        return aValue - bValue;
      } else {
        const aValue = a[key];
        const bValue = b[key];
        return aValue.localeCompare(bValue);
      }
    }
    case 'number': {
      return a[key] - b[key];
    }
  }
}
