export default async function waitForAppMessage(type: string, key: string) {
  return new Promise((resolve) => {
    function msgWaiter(event: any) {
      const data = event.data;
      if (data.type === type && data.payload.key === key) {
        window.removeEventListener('message', msgWaiter);
        resolve(data);
      }
    }

    window.addEventListener('message', msgWaiter, false);
  });
}
