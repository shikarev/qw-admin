export function camelToUnderline(obj: any) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

export function underlineToCamelDeep(obj: any) {
  const keyValues = Object.keys(obj).map(key => {

    if(typeof(obj[key]) === 'object'){
      const newKey: Object = underlineToCamelDeep(obj[key]);
      return { [key.replace(/_([a-z])/g, letter => `${letter.toUpperCase().slice(-1)}`)]: newKey };
    } else {
      const newKey = key.replace(/_([a-z])/g, letter => `${letter.toUpperCase().slice(-1)}`);
      return { [newKey]: obj[key] };
    }
  });
  return Object.assign({}, ...keyValues);
}