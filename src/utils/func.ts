export function toLocaleDateTimeString(str?: string) {
  if (!str) return;

  return new Date(str).toLocaleString().replaceAll('/', '-');
}

export function isObjectEqual(
  o1: Record<string, any>,
  o2: Record<string, any>,
) {
  const obj1Keys = Object.keys(o1);
  const obj2Keys = Object.keys(o2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (let key of obj1Keys) {
    if (o1[key] !== o2[key]) {
      return false;
    }
  }

  return true;
}
