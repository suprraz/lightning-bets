import ChatForm from "./ChatForm";
import ChatImg from "./ChatImg";

export default function ChatApp({screenName}) {
  return (
    <div id="chatApp" className="is-flex is-flex-direction-row">
      <ChatForm screenName={screenName} />
      <ChatImg />
    </div>
  )
}
