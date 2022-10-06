import './App.css';
import { useState} from "react";
import ScreenNameSetter from "./components/ScreenNameSetter";
import ChatApp from "./components/ChatApp";

if(window === window.top) {
  window.location.href = "http://localhost:8000/?runAppFromUrl=http://localhost:3000";
}

function App() {
  const [screenName, setScreenName] = useState(null);

  const onSetScreenName = (sn) => {
    setScreenName(sn);
  }

  return (
    <div className="container" id="homeScreen" data-anchor="homeScreenAnchor">
      <section className="mt-6 notification is-info is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
        <p className="title">Village Discussion</p>

        {!screenName ?
          <ScreenNameSetter onSet={onSetScreenName} value={screenName} />
          :
          <ChatApp screenName={screenName}/>
        }
      </section>
    </div>

  );
}

export default App;
