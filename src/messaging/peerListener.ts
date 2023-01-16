class _PeerListener {
  addListener(qualifier: string, callback: (data: any) => void) {
    const newListener = (event: MessageEvent<any>) => {
      if (event?.data?.payload?.method === qualifier) {
        console.log('##### Received a broadcast of type: ' + qualifier, event?.data?.payload.data);
        callback(event?.data?.payload.data);
      }
    };

    window.addEventListener('message', newListener, false);
    return newListener;
  }

  removeListener(listener: (event: MessageEvent<any>) => any) {
    window.removeEventListener('message', listener);
  }
}

const PeerListener = new _PeerListener();

export default PeerListener;
