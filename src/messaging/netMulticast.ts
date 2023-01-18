export function netMulticast(method: string, data: any) {
  console.log('#### multicasting', method);
  const message = {
    type: 'appOwnerMulticast',
    payload: {
      method,
      data
    }
  };

  window.parent.postMessage(message, '*');
}
