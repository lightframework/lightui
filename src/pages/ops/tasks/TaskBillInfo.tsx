import { Host } from './TaskInfoModal';

export default function TaskBillInfo({ bill }: { bill: API.TaskBillInfo }) {
  const host: Host = JSON.parse(bill.inputParams);

  console.log(host);

  return <div className="w-7/12">{JSON.stringify(bill, null, 2)}</div>;
}
