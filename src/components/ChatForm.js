import ChatBox from "./ChatBox";
import {useCallback, useEffect, useRef, useState} from "react";

function timeStamp() {
  return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'});
}

export default function ChatForm ({screenName}) {
  const inputRef = useRef(null);
  const [chatLog, setChatLog] = useState([]);

  const onMessageReceived = useCallback(event => {
    console.log('received event');
    console.log(event.data);
    const { payload } = event?.data;
    if( payload?.text && payload?.sender) {
      setChatLog([...chatLog, `${timeStamp()}  ${payload.sender}: ` + payload.text]);
    }
  }, [chatLog]);

  useEffect(() => {
    window.addEventListener('message', onMessageReceived, false);

    return () => {
      window.removeEventListener('message', onMessageReceived)
    }
  }, [onMessageReceived]);


  const onFormSubmit = (e) => {
    e.preventDefault();

    const msgText = inputRef.current.value;
    inputRef.current.value = '';

    setChatLog([...chatLog, `${timeStamp()}  ${screenName}: ` + msgText]);

    const message = {
      type: 'broadcastMessage',
      payload: {
        method: 'broadcastMessage',
        text: msgText,
        sender: screenName
      }
    }

    window.parent.postMessage(message, '*');
  }

  return (
    <div>
      <ChatBox chatLog={chatLog}/>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <input className="input my-2 mr-2 is-small" type="text" id="chatBoxMessage" ref={inputRef}/>
        <button className="button is-primary my-2" type="submit">Send</button>
      </form>
    </div>
  )
}
