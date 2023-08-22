import G6, { GraphData } from '@antv/g6';
import { useEffect, useRef } from 'react';

export default function HostGraph() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data: GraphData = {
      nodes: [
        {
          id: 'e1',
          label: '万达',
        },
        {
          id: 't1',
          label: 'mobile',
        },
        {
          id: 't2',
          label: 'redis',
        },
        {
          id: 't3',
          label: 'mongo',
        },
        {
          id: 't4',
          label: 'noe4j',
        },
        {
          id: 't5',
          label: 'commonserver',
        },
        {
          id: 't6',
          label: 'adminportal',
        },
        {
          id: 't7',
          label: 'pop',
        },
        {
          id: 't8',
          label: 'cpe',
        },
        {
          id: 't9',
          label: 'vcpe',
        },
        {
          id: 'h1',
          label: '9-mobile-tencent',
        },
        {
          id: 'h2',
          label: '8-redis-tencent',
        },
        {
          id: 'h3',
          label: '8-redis-tencent',
        },
        {
          id: 'h4',
          label: '8-cpe-mongo-tencent',
        },
        {
          id: 'h5',
          label: '8-cpe-neo4j-tencent',
        },
        {
          id: 'h6',
          label: '13-commonserver-tencent',
        },
        {
          id: 'h7',
          label: 'pop-3-tencent',
        },
        {
          id: 'h8',
          label: 'pop-1-tencent',
        },
        {
          id: 'h9',
          label: '13-cpe-tencent',
        },
        {
          id: 'h10',
          label: '13-vcpe-tencent',
        },
      ],
      edges: [
        {
          source: 't1',
          target: 'e1',
        },
        {
          source: 't2',
          target: 'e1',
        },
        {
          source: 't3',
          target: 'e1',
        },
        {
          source: 't4',
          target: 'e1',
        },
        {
          source: 't5',
          target: 'e1',
        },
        {
          source: 't6',
          target: 'e1',
        },
        {
          source: 't7',
          target: 'e1',
        },
        {
          source: 't8',
          target: 'e1',
        },
        {
          source: 't9',
          target: 'e1',
        },
        {
          source: 'h1',
          target: 't1',
        },
        {
          source: 'h2',
          target: 't2',
        },
        {
          source: 'h3',
          target: 't2',
        },
        {
          source: 'h4',
          target: 't3',
        },
        {
          source: 'h5',
          target: 't4',
        },
        {
          source: 'h6',
          target: 't5',
        },
        {
          source: 'h7',
          target: 't6',
        },
        {
          source: 'h8',
          target: 't7',
        },
        {
          source: 'h9',
          target: 't8',
        },
        {
          source: 'h10',
          target: 't9',
        },
      ],
    };

    if (!ref.current) throw new Error('ref is not assigned');

    const graph = new G6.Graph({
      container: ref.current,
      width: 1200,
      height: 800,
      layout: {
        type: 'radial',
        linkDistance: 50, // 可选，边长
        maxIteration: 1000, // 可选
        focusNode: 'node11', // 可选
        unitRadius: 100, // 可选
        preventOverlap: true, // 可选，必须配合 nodeSize
        nodeSize: 30, // 可选
        strictRadial: false, // 可选
        workerEnabled: true,
      },
    });

    graph.data(data);
    graph.render();
  }, []);

  return <div ref={ref}></div>;
}
