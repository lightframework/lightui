import {
  cloudPlacementApiCmdbCloudsPlaces,
  cloudReadOneApiCmdbCloudsByUid,
} from '@/services/cmdb/cloud';
import { regionReadOneApiCmdbRegionsByUid } from '@/services/cmdb/region';
import { zoneReadOneApiCmdbZonesByUid } from '@/services/cmdb/zone';
import G6, { EdgeConfig, Graph, GraphData, NodeConfig } from '@antv/g6';
import { useQuery } from '@tanstack/react-query';
import { Drawer } from 'antd';
import { useEffect, useRef, useState } from 'react';

async function fetchGraphData(): Promise<GraphData> {
  const res = await cloudPlacementApiCmdbCloudsPlaces({});
  const data = res.data?.Tree;

  if (!data) {
    throw new Error('data not found');
  }

  const nodes: NodeConfig[] = [];
  const edges: EdgeConfig[] = [];

  for (const cloud of data) {
    nodes.push({
      id: cloud.Uid,
      label: cloud.CloudName,
      class: 'cloud',
      size: 60,
      style: {
        fill: '#69b1ff',
        stroke: 'transparent',
      },
    });
    if (!cloud.RegionSet) break;
    for (const region of cloud.RegionSet) {
      nodes.push({
        id: region.Uid,
        label: region.RegionName,
        class: 'region',
        size: 40,
        style: {
          fill: '#95de64',
          stroke: 'transparent',
        },
      });
      edges.push({ source: cloud.Uid, target: region.Uid });
      if (!region.ZoneSet) break;
      for (const zone of region.ZoneSet) {
        nodes.push({
          id: zone.Uid,
          label: zone.ZoneName,
          class: 'zone',
          size: 20,
          style: {
            fill: '#ff85c0',
            stroke: 'transparent',
          },
        });
        edges.push({ source: region.Uid, target: zone.Uid });
      }
    }
  }

  return { nodes, edges };
}

function NodeInfo({
  node,
}: {
  node: { uid: string; class: 'cloud' | 'region' | 'zone' };
}) {
  const { data } = useQuery({
    queryKey: [node.class, node.uid],
    queryFn: () => {
      switch (node.class) {
        case 'cloud': {
          return cloudReadOneApiCmdbCloudsByUid({ uid: node.uid });
        }
        case 'region': {
          return regionReadOneApiCmdbRegionsByUid({ uid: node.uid });
        }
        case 'zone': {
          return zoneReadOneApiCmdbZonesByUid({ uid: node.uid });
        }
      }
    },
  });

  if (!data?.data) {
    return;
  }

  return <pre>{JSON.stringify(data.data, null, 2)}</pre>;
}

export default function HostGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph>();

  const [openNodeInfoDrawer, setOpenNodeInfoDrawer] = useState(false);
  const [clickedNode, setClickedNode] = useState<
    { uid: string; class: 'cloud' | 'region' | 'zone' } | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      if (graphRef.current || !containerRef.current) return;

      const data = await fetchGraphData();

      const graph = new G6.Graph({
        container: containerRef.current,
        width: 1500,
        height: 800,
        fitView: true,
        layout: {
          type: 'force2',
          preventOverlap: true,
          workerEnabled: true,
          gpuEnabled: true,
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
            stroke: '#ffd666',
            lineWidth: 3,
          },
        },
      });

      graph.data(data);
      graph.render();

      graphRef.current = graph;

      graph.on('node:click', (e) => {
        const clickNodes = graph.findAllByState('node', 'click');
        clickNodes.forEach((cn) => graph.setItemState(cn, 'click', false));

        const nodeItem = e.item;
        if (nodeItem) {
          graph.setItemState(nodeItem, 'click', true);
          setOpenNodeInfoDrawer(true);
          setClickedNode({
            uid: nodeItem._cfg?.model?.id as string,
            class: nodeItem._cfg?.model?.class as any,
          });
        }
      });
    })();
  }, []);

  return (
    <>
      <div ref={containerRef}></div>
      <Drawer
        title="节点详情"
        placement="right"
        open={openNodeInfoDrawer}
        onClose={() => setOpenNodeInfoDrawer(false)}
      >
        {clickedNode ? <NodeInfo node={clickedNode} /> : null}
      </Drawer>
    </>
  );
}
