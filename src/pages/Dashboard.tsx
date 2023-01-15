import ChatApp from '../components/ChatApp';
import { useSelector } from 'react-redux';
import { selectScreenName } from '../redux/userSlice';

export default function Dashboard() {
  const screenName = useSelector(selectScreenName);
  return (
    <div className="container" id="homeScreen" data-anchor="homeScreenAnchor">
      <section className="mt-6 notification is-info is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
        <p className="title">Lightning Bets Dashboard | {screenName}</p>
        <ChatApp />
      </section>
    </div>
  );
}
