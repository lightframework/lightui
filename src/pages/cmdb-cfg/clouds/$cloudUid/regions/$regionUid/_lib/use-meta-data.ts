import { useQueryCloud } from "@/lib/hooks/data"
import { useParams } from "@umijs/max"

export function useMetaData() {
  const { cloudUid, regionUid } = useParams()

  const { data } = useQueryCloud(cloudUid!)

  return { cloud: data, regionUid: regionUid! }
}
