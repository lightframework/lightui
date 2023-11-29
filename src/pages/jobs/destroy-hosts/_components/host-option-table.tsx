import { hostListApiCmdbHostsList } from "@/services/cmdb/host"

export default function HostOptionTable() {
  hostListApiCmdbHostsList({})

  return <div>HostOptionTable</div>
}
