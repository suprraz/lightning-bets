// @ts-nocheck
import ChatBox from './ChatBox';
import { useCallback, useEffect, useRef, useState } from 'react';

function timeStamp() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export default function ChatForm({screenName}: { screenName: string }) {
  const inputRef = useRef(null);
  const [chatLog, setChatLog] = useState([]);

  const onMessageReceived = useCallback(
    (event: MessageEvent<any>) => {
      console.log('received event');
      console.log(event.data);
      const {payload} = event?.data;
      if (payload?.text && payload?.sender) {
        // @ts-ignore
        setChatLog([...chatLog, `${timeStamp()}  ${payload.sender}: ` + payload.text]);
      }
    },
    [chatLog]
  );

  useEffect(() => {
    window.addEventListener('message', onMessageReceived, false);

    return () => {
      window.removeEventListener('message', onMessageReceived);
    };
  }, [onMessageReceived]);

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    const msgText = inputRef?.current.value;
    inputRef.current.value = '';

    setChatLog([...chatLog, `${timeStamp()}  ${screenName}: ` + msgText]);

    const message = {
      type: 'appOwnerMulticast',
      payload: {
        method: 'appOwnerMulticast',
        text: msgText,
        sender: screenName
      }
    };

    window.parent.postMessage(message, '*');
  };

  return (
    <div>
      <ChatBox chatLog={chatLog}/>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <input
          className="input my-2 mr-2 is-small"
          type="text"
          id="chatBoxMessage"
          ref={inputRef}
        />
        <button className="button is-primary my-2" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
