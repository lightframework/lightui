import { HostCreateFormData } from "./_components/host-create-form"

export function calHostFormSubnetCount(
  vpcSubnetUids: HostCreateFormData["vpcSubnetUids"],
) {
  return (vpcSubnetUids ?? []).reduce(
    (prev, { subnetUid }) => {
      if (subnetUid) {
        if (!prev[subnetUid]) {
          prev[subnetUid] = 1
        } else {
          prev[subnetUid] = prev[subnetUid] + 1
        }
      }

      return prev
    },
    {} as Record<string, number>,
  )
}
