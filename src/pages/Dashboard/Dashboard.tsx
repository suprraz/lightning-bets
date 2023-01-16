import ChatApp from '../../components/ChatApp';
import { useDispatch, useSelector } from 'react-redux';
import { saveScreenName, selectScreenName } from '../../redux/userSlice';
import { AppDispatch } from '../../redux/store';
import { setActivePath } from '../../redux/routeSlice';
import { useEffect } from 'react';
import { selectActiveBets, updateBets } from '../../redux/betsSlice';
import { netBroadcast } from '../../messaging/netBroadcast';
import PeerListener from '../../messaging/peerListener';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const screenName = useSelector(selectScreenName);
  const activeBets = useSelector(selectActiveBets);

  useEffect(() => {
    const betListListener = PeerListener.addListener('betList', (data) => {
      dispatch(updateBets(data.betList));
    });

    const betListRequest = PeerListener.addListener('requestBets', () => {
      netBroadcast('betList', { betList: activeBets, screenName });
    });

    const networkChangedListener = PeerListener.addListener('networkChange', () => {
      netBroadcast('requestBets', { screenName });
    });

    return () => {
      PeerListener.removeListener(betListListener);
      PeerListener.removeListener(betListRequest);
      PeerListener.removeListener(networkChangedListener);
    };
  }, []);

  useEffect(() => {
    netBroadcast('requestBets', { screenName });
  }, [screenName]);

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
        <p className="subtitle">{activeBets?.length} bets active</p>
        <ChatApp />
      </section>
    </div>
  );
}
