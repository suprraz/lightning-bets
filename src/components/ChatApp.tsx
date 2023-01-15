import ChatForm from './ChatForm';
import BetsList from './BetsList';
import { useSelector } from 'react-redux';
import { selectScreenName } from '../redux/userSlice';

export default function ChatApp() {
  const screenName = useSelector(selectScreenName);
  return (
    <div id="chatApp" className="is-flex is-flex-direction-row">
      <ChatForm screenName={screenName} />
      <BetsList />
    </div>
  );
}
