import PeerListener from '../../messaging/peerListener';
import { updateBets } from '../slices/betsSlice';
import { netSendMsg } from '../../messaging/netSendMsg';
import { AppDispatch, RootState } from '../store';
import { netMulticast } from '../../messaging/netMulticast';
import { updatePeers } from '../slices/networkSlice';

export default function addNetworkListeners(dispatch: AppDispatch, getState: () => RootState) {
  PeerListener.addListener('betList', (payload, senderId) => {
    dispatch(updateBets(payload.data.betList));
  });

  PeerListener.addListener('requestBets', (payload, senderId) => {
    if (senderId) {
      const state = getState();
      netSendMsg(
        'betList',
        { betList: state.bets.bets, screenName: state.user.screenName },
        senderId as string
      );
    }
  });

  PeerListener.addListener('networkChange', (payload) => {
    const state = getState();
    const newPeerIds = payload?.peerIds?.filter(
      (peerId: string) => !state.network.peers.find((p) => p.id === peerId)
    );
    if (newPeerIds && newPeerIds.length) {
      dispatch(updatePeers(payload.peerIds.map((peerId: string) => ({ id: peerId }))));
      netMulticast('requestBets', { screenName: state.user.screenName });
    }
  });
}
