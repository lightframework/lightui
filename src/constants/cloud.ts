export type CloudSyncType =
  | "region"
  | "zone"
  | "vpc"
  | "security-group"
  | "image"
  | "tag"

export const cloudSyncTargetMap: { [key in CloudSyncType]: number } = {
  region: 0,
  zone: 1,
  vpc: 2,
  "security-group": 3,
  image: 4,
  tag: 5,
}

export const cloudSyncTitleMap: { [key in CloudSyncType]: string } = {
  region: "区域和可用区",
  zone: "可用机型",
  vpc: "网络",
  "security-group": "安全组",
  image: "镜像",
  tag: "云商标签",
}
