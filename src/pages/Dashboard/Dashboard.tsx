import ChatApp from '../../components/ChatApp';
import { useDispatch, useSelector } from 'react-redux';
import { saveScreenName, selectScreenName } from '../../redux/slices/userSlice';
import { AppDispatch } from '../../redux/store';
import { setActivePath } from '../../redux/slices/routeSlice';
import { selectBetlist } from '../../redux/slices/betsSlice';
import { selectAppPeers } from '../../redux/slices/networkSlice';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const screenName = useSelector(selectScreenName);
  const bets = useSelector(selectBetlist);
  const peers = useSelector(selectAppPeers);

  const changeScreenName = () => {
    dispatch(saveScreenName(''));
    dispatch(setActivePath('updateScreenName'));
  };

  return (
    <div className="container" id="homeScreen" data-anchor="homeScreenAnchor">
      <section className="mt-6 notification is-info is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
        <p className="title">
          Lightning Bets Dashboard | <a onClick={() => changeScreenName()}>{screenName}</a>
        </p>
        <p className="">{peers?.length} peers</p>
        <p className="mb-3">{bets?.length} bets active</p>
        <ChatApp />
      </section>
    </div>
  );
}
