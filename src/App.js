import './App.css';
import {useCallback, useEffect, useRef, useState} from "react";

function timeStamp() {
  return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'});
}

function App() {
  debugger;
  const inputRef = useRef(null);
  const [chatLog, setChatLog] = useState([]);
  const [sn, setSn] = useState(null);

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

  useEffect(() => {
    //todo: get sn from user or storage
    setSn('sn' + Math.floor(Math.random() * (100 - 0 + 1) + 0));
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const msgText = inputRef.current.value;
    inputRef.current.value = '';

    setChatLog([...chatLog, `${timeStamp()}  ${sn}: ` + msgText]);

    const message = {
      type: 'broadcastMessage',
      payload: {
        method: 'broadcastMessage',
        text: msgText,
        sender: sn
      }
    }

    window.parent.postMessage(message, '*');
  }

  return (
    <div className="section" id="homeScreen" data-anchor="homeScreenAnchor">
      <article className="tile is-4 is-child notification is-info">
        <div id="chatApp">
          <p className="title">Village chat</p>
          <div className="box chatBox" id="chatLog">
            {chatLog.map((msg, i) => <div key={i}>{msg}</div>)}
          </div>
          <form onSubmit={(e) => onFormSubmit(e)}>
            <input className="input my-2" type="text" id="chatBoxMessage" ref={inputRef}/>
            <button type="submit">Send</button>
          </form>
          <figure className="image is-16by9 mt-5">
            <img
              src="https://www.omnihotels.com/-/media/images/hotels/sandtn/destinations/sandtn-seaport-village.jpg?h=663&la=en&w=1170" />
          </figure>
        </div>
      </article>
    </div>

  );
}

export default App;
