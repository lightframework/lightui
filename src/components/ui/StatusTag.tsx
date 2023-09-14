import { Tag, TagProps } from 'antd';

export default function StatusTag(
  props: (
    | {
        content?: boolean;
      }
    | { content: string; positive: string }
  ) & {
    color?: TagProps['color'];
  },
) {
  if (props.content === undefined || props.content === '') {
    return '-';
  }

  const isPositive =
    typeof props.content === 'string' &&
    props.content.toLowerCase() === props.positive.toLowerCase();

  const isTrue = typeof props.content === 'boolean' && props.content === true;

  return (
    <Tag color={props.color ?? (isTrue || isPositive ? '#87d068' : '#f50')}>
      {typeof props.content === 'string'
        ? props.content
        : props.content
        ? '是'
        : '否'}
    </Tag>
  );
}
