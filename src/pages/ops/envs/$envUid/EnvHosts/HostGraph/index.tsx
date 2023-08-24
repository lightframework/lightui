import { ProDescriptions } from '@ant-design/pro-components';
import G6, { GraphData } from '@antv/g6';
import { Drawer } from 'antd';
import { useEffect, useRef, useState } from 'react';

export default function HostGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const [openNodeInfoDrawer, setOpenNodeInfoDrawer] = useState(false);
  const [clickedNode, setClickedNode] = useState<string | undefined>(undefined);

  useEffect(() => {
    const data: GraphData = {
      nodes: [
        {
          id: 'e1',
          label: '万达',
          class: 'e',
        },
        {
          id: 't1',
          label: 'mobile',
          class: 't',
        },
        {
          id: 't2',
          label: 'redis',
          class: 't',
        },
        {
          id: 't3',
          label: 'mongo',
          class: 't',
        },
        {
          id: 't4',
          label: 'noe4j',
          class: 't',
        },
        {
          id: 't5',
          label: 'commonserver',
          class: 't',
        },
        {
          id: 't6',
          label: 'adminportal',
          class: 't',
        },
        {
          id: 't7',
          label: 'pop',
          class: 't',
        },
        {
          id: 't8',
          label: 'cpe',
          class: 't',
        },
        {
          id: 't9',
          label: 'vcpe',
          class: 't',
        },
        {
          id: 'h1',
          label: '9-mobile-tencent',
          class: 'h',
        },
        {
          id: 'h2',
          label: '8-redis-tencent',
          class: 'h',
        },
        {
          id: 'h3',
          label: '8-redis-tencent',
          class: 'h',
        },
        {
          id: 'h4',
          label: '8-cpe-mongo-tencent',
          class: 'h',
        },
        {
          id: 'h5',
          label: '8-cpe-neo4j-tencent',
          class: 'h',
        },
        {
          id: 'h6',
          label: '13-commonserver-tencent',
          class: 'h',
        },
        {
          id: 'h7',
          label: 'pop-3-tencent',
          class: 'h',
        },
        {
          id: 'h8',
          label: 'pop-1-tencent',
          class: 'h',
        },
        {
          id: 'h9',
          label: '13-cpe-tencent',
          class: 'h',
        },
        {
          id: 'h10',
          label: '13-vcpe-tencent',
          class: 'h',
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

    const nodes = data.nodes;
    nodes?.forEach((node) => {
      if (!node.style) {
        node.style = {};
      }

      switch (node.class) {
        case 'e': {
          node.type = 'circle';
          node.size = 80;
          break;
        }
        case 't': {
          node.type = 'circle';
          node.size = 50;
          break;
        }
        case 'h': {
          node.type = 'ellipse';
          node.size = [150, 50];
          break;
        }
      }
    });

    const graph = new G6.Graph({
      container: ref.current,
      width: 1200,
      height: 900,
      layout: {
        type: 'gForce',
        center: [400, 400],
        preset: {
          type: 'radial',
        },
        linkDistance: 100, // 可选，边长
        // // unitRadius: 100, // 可选
        preventOverlap: true, // 可选，必须配合 nodeSize
        nodeSize: 300,
        // strictRadial: true, // 可选
        workerEnabled: true,
        nodeSpacing: 50,
        gpuEnabled: true,
        gravity: 5,
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
      },
      defaultEdge: {
        style: {
          endArrow: true,
        },
      },
      nodeStateStyles: {
        click: {
          lineWidth: 3,
        },
      },
    });

    graph.data(data);
    graph.render();

    graph.on('node:click', (e) => {
      const clickNodes = graph.findAllByState('node', 'click');
      clickNodes.forEach((cn) => graph.setItemState(cn, 'click', false));

      const nodeItem = e.item;
      if (nodeItem) {
        graph.setItemState(nodeItem, 'click', true);
        setOpenNodeInfoDrawer(true);
        setClickedNode(nodeItem._cfg?.model?.label as string | undefined);
      }
    });
  }, []);

  return (
    <>
      <div ref={ref}></div>
      <Drawer
        title="节点详情"
        placement="right"
        open={openNodeInfoDrawer}
        onClose={() => setOpenNodeInfoDrawer(false)}
      >
        <ProDescriptions
          title={clickedNode}
          className="space-y-3"
          column={1}
          items={[
            {
              label: '主机名',
              children: clickedNode,
            },
            {
              label: '公网/公网ip',
              children: '181.181.188.188',
            },
            {
              label: '配置',
              children: '4c-8g-500g',
            },
            {
              label: '云商/付费方式',
              children: '阿里云/包年包月',
            },
            {
              label: '到期时间',
              children: '2023-12-31',
            },
          ]}
        />
      </Drawer>
    </>
  );
}
