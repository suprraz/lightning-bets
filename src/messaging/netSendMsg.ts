export function netSendMsg(method: string, data: any, destinationId: string) {
  console.log('#### appOwnerMessage', method);
  const message = {
    type: 'appOwnerMessage',
    payload: {
      method,
      data: {
        ...data,
        destinationId
      }
    }
  };

  window.parent.postMessage(message, '*');
}
