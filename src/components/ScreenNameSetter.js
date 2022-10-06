import {useRef} from "react";


export default function ScreenNameSetter({onSet, value}) {
  const snRef = useRef();

  return (
    <div className="column is-size-5 is-flex is-flex-direction-column is-half is-offset-one-quarter">
      <h4>Choose a screen name:</h4>
      <form className="is-4 is-flex is-flex-direction-row" onSubmit={() => onSet(snRef.current.value)}>
        <input className="input my-2 mr-2 is-small" size="10" type="text" placeholder="screen name" ref={snRef} value={value}/>
        <button className="button is-primary  my-2" type="submit">Set</button>
      </form>
    </div>);
}
