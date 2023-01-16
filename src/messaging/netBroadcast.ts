export function netBroadcast(method: string, data: any) {
  console.log('#### broadcasting', method);
  const message = {
    type: 'broadcastMessage',
    payload: {
      method,
      data
    }
  };

  window.parent.postMessage(message, '*');
}
