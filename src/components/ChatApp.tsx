import ChatForm from './ChatForm';
import { useSelector } from 'react-redux';
import { selectScreenName } from '../redux/slices/userSlice';
import BetsList from './BetsList';

export default function ChatApp() {
  const screenName = useSelector(selectScreenName);
  return (
    <div id="chatApp" className="is-flex is-flex-direction-row">
      <ChatForm screenName={screenName} />
      <BetsList />
    </div>
  );
}
