import { Host } from './TaskInfoModal';

export default function TaskBillInfo({ bill }: { bill: API.TaskBillInfo }) {
  const host: Host = JSON.parse(bill.inputParams);

  return (
    <div className="w-7/12">
      <div>
        <pre>
          {JSON.stringify(
            {
              hostname: bill.hostName,
              message: bill.message,
              status: bill.status,
              inputParams: undefined,
            },
            null,
            2,
          )}
        </pre>
      </div>
      <div className="max-h-[500px] overflow-y-auto">
        <pre>{JSON.stringify(host, null, 2)}</pre>
      </div>
    </div>
  );
}
