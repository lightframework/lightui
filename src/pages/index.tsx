import PageContainer from '@/components/ui/PageContainer';
import { Resizable } from 're-resizable';
import { useEffect, useState } from 'react';

export default function Home() {
  const [width, setWidth] = useState(200);

  useEffect(() => {
    const cachedWidth = localStorage.getItem('home-width');
    if (cachedWidth !== null) {
      setWidth(Number.parseInt(cachedWidth));
    }
  }, []);

  return (
    <PageContainer>
      <Resizable
        size={{
          width,
          height: '100%',
        }}
        onResizeStop={(_, __, ___, d) => {
          localStorage.setItem('home-width', String(width + d.width));
          setWidth((width) => width + d.width);
        }}
        className="bg-red-400"
        enable={{ right: true }}
      >
        001
      </Resizable>
    </PageContainer>
  );
}
