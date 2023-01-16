import waitForAppMessage from './waitForAppMessage';

export async function saveAppData(key: string, value: string) {
  window.parent.postMessage(
    {
      type: 'saveData',
      payload: {
        key,
        value
      }
    },
    '*'
  );

  return waitForAppMessage('saveDataSuccess', key);
}

export async function readAppData(key: string) {
  window.parent.postMessage(
    {
      type: 'readData',
      payload: {
        key
      }
    },
    '*'
  );

  const data: any = await waitForAppMessage('readDataSuccess', key);

  return data?.payload?.value;
}
