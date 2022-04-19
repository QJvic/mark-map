export function to(promise) {
  return promise.then(res => [null, res]).catch(err => [err]);
}

export default to;
