import { useAccess, useParams } from '@umijs/max';
import { Result } from 'antd';
import PersonTable from './_components/person-table';

export default function Persons() {
  const access = useAccess();
  const { professionUid } = useParams();

  if (!access.personPageListApiCmdbPersons) {
    return (
      <Result status="403" title="403" subTitle="抱歉，你无权访问人员数据" />
    );
  }

  return <PersonTable professionUid={professionUid!} />;
}
