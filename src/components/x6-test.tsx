import { Graph, Node } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { Dropdown } from 'antd';
import { useEffect, useRef } from 'react';

function CustomComponent({ node }: { node: Node }) {
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 'copy',
            label: '复制',
          },
          {
            key: 'paste',
            label: '粘贴',
          },
          {
            key: 'delete',
            label: '删除',
          },
        ],
      }}
    >
      <div className="flex h-full w-full items-center justify-center bg-white">
        {node.prop('label')}
      </div>
    </Dropdown>
  );
}

export default function X6Test() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    register({
      shape: 'custom-react-node',
      width: 100,
      height: 40,
      component: CustomComponent,
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          shape: 'custom-react-node',
          x: 40,
          y: 40,
          label: 'hello',
        },
        {
          id: 'node2',
          shape: 'custom-react-node',
          x: 160,
          y: 180,
          label: 'world',
        },
      ],
      edges: [
        {
          shape: 'edge',
          source: 'node1',
          target: 'node2',
          label: 'x6',
          attrs: {
            line: {
              stroke: '#8f8f8f',
              strokeWidth: 1,
            },
          },
        },
      ],
    };

    const graph = new Graph({
      container: containerRef.current,
      background: {
        color: '#F2F7FA',
      },
    });

    graph.fromJSON(data);
  }, []);

  return <div ref={containerRef} className="h-full w-full bg-white" />;
}
