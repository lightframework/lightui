import { cloudPlacementApiCmdbCloudsPlaces } from '@/services/cmdb/cloud';
import { Graph, TreeGraph, TreeGraphData } from '@antv/g6';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export default function TreeGraphTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph>();

  const { data } = useQuery({
    queryKey: ['cloud-placement'],
    queryFn: () =>
      cloudPlacementApiCmdbCloudsPlaces({}).then(
        (res) => res.data?.Tree?.find((cloud) => cloud.Cloud === 'tc'),
      ),
  });

  useEffect(() => {
    if (data) {
      if (!containerRef.current || graphRef.current) return;

      const graphData: TreeGraphData = {
        id: data.Cloud,
        children: data.RegionSet?.map((region) => ({
          id: region.Region,
          children: region.ZoneSet?.map((zone) => ({ id: zone.Zone })),
        })),
      };

      const graph = new TreeGraph({
        container: containerRef.current,
        fitView: true,
        fitCenter: true,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        layout: {
          type: 'dendrogram',
          direction: 'LR',
          radial: true,
        },
      });

      graph.data(graphData);
      graph.render();

      graphRef.current = graph;
    }
  }, [data]);

  return <div ref={containerRef} className="h-full w-full bg-white" />;
}
