export function camelToUnderline(obj: any) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}