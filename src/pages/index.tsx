import LinkTabs from '@/components/ui/LinkTabs';
import PageContainer from '@/components/ui/PageContainer';

export default function Home() {
  return (
    <PageContainer>
      <LinkTabs
        items={[
          { label: '项目概览', to: '/' },
          { label: '主机列表', to: 'hosts' },
          {
            label: '项目列表',
            to: 'project',
          },
        ]}
      />
    </PageContainer>
  );
}
