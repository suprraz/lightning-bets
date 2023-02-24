import ChatForm from './ChatForm';
import { useSelector } from 'react-redux';
import { selectScreenName } from '../redux/slices/userSlice';
import GameBoard from './GameBoard/GameBoard';

export default function HockeyApp() {
  const screenName = useSelector(selectScreenName);
  return (
    <div id="chatApp" className="is-flex is-flex-direction-row">
      <GameBoard />
      <div className="ml-6">
        <ChatForm screenName={screenName} />
      </div>
    </div>
  );
}
