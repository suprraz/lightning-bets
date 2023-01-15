// @ts-nocheck
import {useEffect, useRef} from "react";

export default function ChatBox({chatLog}: { chatLog: any[] }) {
  const divRef = useRef(null);

  useEffect(() => {
    if (chatLog.length) {
      divRef?.current?.scrollIntoView({behavior: 'smooth'});
    }
  }, [chatLog]);

  return (
    <div className="box chatBox" id="chatLog">
      {
        chatLog.map((msg, i) => <div key={i} ref={i === chatLog.length - 1 ? divRef : undefined}>{msg}</div>)
      }
    </div>
  )
}
