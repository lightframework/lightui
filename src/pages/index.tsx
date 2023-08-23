import PageContainer from '@/components/ui/PageContainer';
import { taskPageListApiOpsTasks } from '@/services/ops/task';

export default function Home() {
  taskPageListApiOpsTasks({});
  return <PageContainer></PageContainer>;
}
