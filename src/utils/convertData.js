const clone = (obj) => Object.assign({}, obj);
export const renameKey = (object, key, newKey) => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};



// convert retreive data to type of  ant design table data
export function transformArray(array) {

  let result = array.map(obj => {
    return renameKey(obj, 'id', 'key');
  });

  return result;
}