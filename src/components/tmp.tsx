import Centered from '@/components/centered';
import { useToken } from '@/lib/hooks/use-token';
import { cloudPlacementApiCmdbCloudsPlaces } from '@/services/cmdb/cloud';
import { EdgeConfig, Graph, GraphData, NodeConfig } from '@antv/g6';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';

export default function Tmp() {
  const [loading, setLoading] = useState(false);
  const { token } = useToken();
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | undefined>();

  const { data } = useQuery({
    queryKey: ['cloud-placement'],
    queryFn: () =>
      cloudPlacementApiCmdbCloudsPlaces({}).then((res) => res.data?.Tree ?? []),
  });

  useEffect(() => {
    if (data) {
      if (graphRef.current || !containerRef.current) return;

      setLoading(true);

      const nodes: NodeConfig[] = [];
      const edges: EdgeConfig[] = [];

      const tc = data.find((cloud) => cloud.ResourceGroup === 'tc-ops');

      if (!tc) return;

      const tcNodeId = tc.ResourceGroup;

      nodes.push({
        id: tcNodeId,
        size: 50,
        // label: tc.ResourceGroup,
        isCloud: true,
        style: {
          fill: token.blue2,
          stroke: token.blue2,
        },
      });

      tc.RegionSet?.forEach((region) => {
        const regionNodeId = `region-${region.Region}`;
        nodes.push({
          id: regionNodeId,
          size: 30,
          // label: region.Region,
          isRegion: true,
          style: {
            fill: token.green2,
            stroke: token.green2,
          },
        });
        edges.push({ source: tcNodeId, target: regionNodeId, isRegion: true });

        region.ZoneSet?.forEach((zone) => {
          const zoneNodeId = `zone-${zone.Zone}`;
          nodes.push({
            id: zoneNodeId,
            size: 20,
            // label: zone.Zone,
            isZone: true,
            style: {
              fill: token.orange2,
              stroke: token.orange2,
            },
          });
          edges.push({
            source: regionNodeId,
            target: zoneNodeId,
            isZone: true,
          });
        });
      });

      const graphData: GraphData = { nodes, edges };

      const graph = new Graph({
        container: containerRef.current,
        width: 1200,
        height: 800,

        fitView: true,
        layout: {
          type: 'force2',
          gravity: 500,
          linkDistance: (d: any) => {
            if (d.isRegion) {
              return 100;
            }
            return 10;
          },
          // nodeStrength: (d: any) => {
          //   if (d.isZone) {
          //     return 0;
          //   }
          //   return 10;
          // },
          // edgeStrength: (d: any) => {
          //   if (d.isRegion) {
          //     return 0.7;
          //   }
          //   return 0.1;
          // },
          preventOverlap: true,
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
          edit: ['click-select'],
        },
      });

      graph.data(graphData);
      graph.render();

      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <Centered>
        <Spin />
      </Centered>
    );
  }

  return <div ref={containerRef} className="bg-white" />;
}
