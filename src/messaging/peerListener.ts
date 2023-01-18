class _PeerListener {
  addListener(qualifier: string, callback: (payload: any, senderId?: string) => void) {
    const newListener = (event: MessageEvent<any>) => {
      if (event?.data?.payload?.method === qualifier) {
        console.log('##### Received a multicast of type: ' + qualifier, event?.data?.payload.data);

        callback(event?.data?.payload, event?.data?.senderId);
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
